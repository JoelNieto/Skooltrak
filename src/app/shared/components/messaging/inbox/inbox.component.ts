import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageInbox } from 'src/app/shared/models/message.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.sass'],
})
export class InboxComponent implements OnInit {
  inboxSource: InboxDataSource;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    public session: SessionService
  ) {
    this.inboxSource = new InboxDataSource(messagesService);
  }

  ngOnInit(): void {}

  openMessage(message: MessageInbox) {
    this.router.navigate([message.id], { relativeTo: this.route });
  }
}

export class InboxDataSource extends DataSource<MessageInbox | undefined> {
  private cachedMessages = Array.from<MessageInbox>({ length: 0 });
  private stream = new BehaviorSubject<(MessageInbox | undefined)[]>(
    this.cachedMessages
  );
  private subscription = new Subscription();

  private pageSize = 10;
  private lastPage = 0;
  private lastId: string;
  constructor(private messagesService: MessagesService) {
    super();
    this.getMessages();
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<
    (MessageInbox | undefined)[] | ReadonlyArray<MessageInbox | undefined>
  > {
    this.subscription.add(
      collectionViewer.viewChange.subscribe((range) => {

        const currentPage = this._getPageForIndex(range.end);
        console.log(currentPage, this.lastPage);
        if (currentPage && range) {
          console.log(currentPage, this.lastPage);
        }

        if (currentPage > this.lastPage) {
          this.lastPage = currentPage;
          this.getMessages();
        }
      })
    );
    return this.stream;
  }

  getMessages(): void {
    this.messagesService.getInbox(this.lastId).subscribe((res) => {
      this.cachedMessages = this.cachedMessages.concat(res);
      this.lastId = res[9]?.id;
      this.stream.next(this.cachedMessages);
    });
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  private _getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }
}

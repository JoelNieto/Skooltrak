import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Message, MessageInbox } from 'src/app/shared/models/message.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';

import { ComposeComponent } from '../compose/compose.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.sass'],
})
export class InboxComponent implements OnInit {
  inboxSource: InboxDataSource;
  loading = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private transloco: TranslocoService,
    private modal: NgbModal,
    public session: SessionService
  ) {
    this.inboxSource = new InboxDataSource(messagesService);
  }

  ngOnInit(): void {}

  openMessage(message: MessageInbox) {
    this.router.navigate([message.id], { relativeTo: this.route.parent });
  }

  trash(id: string) {
    this.messagesService.sentTrash(id).subscribe(() => {
      Swal.fire('Mensaje enviado a la papelera', '', 'info');
      this.inboxSource.resetMessages();
    });
  }

  replyMessage(message: MessageInbox) {
    const modalRef = this.modal.open(ComposeComponent, {
      size: 'lg',
      beforeDismiss: async () => {
        const result = await Swal.fire<Promise<boolean>>({
          title: this.transloco.translate('Wanna discard this message?'),
          text: this.transloco.translate(
            'This cannot be reversed. The message will be gone permanently'
          ),
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#E53E3E',
          cancelButtonText: this.transloco.translate('Cancel'),
          confirmButtonText: this.transloco.translate('Discard'),
        });
        if (result.value) {
          return result.value;
        } else {
          return false;
        }
      },
    });
    modalRef.result.then(
      (send: Message) => {
        send.status = 1;
        this.messagesService.create(send).subscribe((res) => {
          Swal.fire(
            this.transloco.translate('Message sent succesfully'),
            res.title,
            'success'
          );
        });
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          err.message,
          'error'
        );
      }
    );
    modalRef.componentInstance.replyMessage = message;
  }
}

export class InboxDataSource extends DataSource<MessageInbox | undefined> {
  public cachedMessages = Array.from<MessageInbox>({ length: 0 });
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
        const currentPage = this.getPageForIndex(range.end);
        if (currentPage > this.lastPage) {
          this.lastPage = currentPage;
          this.getMessages();
        }
      })
    );
    return this.stream;
  }

  resetMessages(): void {
    this.lastId = '';
    this.cachedMessages = [];
    this.getMessages();
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

  private getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }
}

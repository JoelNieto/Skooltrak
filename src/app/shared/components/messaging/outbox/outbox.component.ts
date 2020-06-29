import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Observable } from 'rxjs';
import { Message } from 'src/app/shared/models/message.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.sass'],
})
export class OutboxComponent implements OnInit {
  public messages: Observable<Message[]>;
  constructor(
    private messageService: MessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.messages = this.messageService.getSent();
  }

  openMessage(message: Message) {
    this.router.navigate([message.id], {
      relativeTo: this.route.parent,
      state: { isOutbox: true },
    });
  }
}

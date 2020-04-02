import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MessageInbox } from 'src/app/shared/models/message.model';
import { MessagesService } from 'src/app/shared/services/messages.service';

import { DetailsComponent } from '../details/details.component';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.sass']
})
export class InboxComponent implements OnInit {
  constructor(
    private messagesService: MessagesService,
    private modal: NgbModal,
    public session: SessionService
  ) {}

  ngOnInit(): void {
  }

  openMessage(message: MessageInbox) {
    if (!message.read) {
      this.messagesService.setRead(message.id).subscribe(() => {
        this.session.currentInbox = this.messagesService.getInbox();
        this.session.readMessage();
      });
    }
    const modalRef = this.modal.open(DetailsComponent, { size: 'lg' });
    modalRef.componentInstance.message = message;
  }
}

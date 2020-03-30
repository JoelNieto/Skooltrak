import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Message } from 'src/app/shared/models/message.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import Swal from 'sweetalert2';

import { SessionService } from '../../services/session.service';
import { ComposeComponent } from './compose/compose.component';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.sass']
})
export class MessagingComponent implements OnInit {
  constructor(
    private modal: NgbModal,
    public session: SessionService,
    private messageService: MessagesService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {}

  composeMessage() {
    this.modal
      .open(ComposeComponent, { size: 'lg' })
      .result.then((message: Message) => {
        message.status = 1;
        this.messageService.create(message).subscribe(res => {
          Swal.fire(
            this.transloco.translate('Message sent succesfully'),
            '',
            'success'
          );
        });
      });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
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
  styleUrls: ['./messaging.component.sass'],
})
export class MessagingComponent implements OnInit {
  @ViewChild(ComposeComponent) compose: ComposeComponent;

  constructor(
    private modal: NgbModal,
    public session: SessionService,
    private messageService: MessagesService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {}

  composeMessage() {
    const modalRef = this.modal.open(ComposeComponent, {
      size: 'lg',
      beforeDismiss: async () => {
        const result = await Swal.fire({
          title: this.transloco.translate('Wanna discard this message?'),
          text: this.transloco.translate(
            'This cannot be reversed. The message will be gone permanently'
          ),
          icon: 'question',
          showCancelButton: true,
          cancelButtonColor: '#A0AEC0',
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
      (message: Message) => {
        message.status = 1;
        this.messageService.create(message).subscribe((res) => {
          Swal.fire(
            this.transloco.translate('Message sent succesfully'),
            res.title,
            'success'
          );
        });
      },
      () => {}
    );
  }
}

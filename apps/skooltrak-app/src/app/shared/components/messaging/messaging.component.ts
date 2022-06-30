import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Message } from 'src/app/shared/models/message.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import Swal from 'sweetalert2';

import { SessionService } from '../../services/session.service';
import { ComposeComponent } from './compose/compose.component';

@Component({
  selector: 'skooltrak-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.sass'],
})
export class MessagingComponent {
  @ViewChild(ComposeComponent) compose: ComposeComponent;

  constructor(
    private modal: NgbModal,
    public session: SessionService,
    private messageService: MessagesService,
    private transloco: TranslocoService
  ) {}

  replyMessage(original: Message) {
    const message: Message = {
      title: 'Re: ' + original.title,
      content: original.content,
    };

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

    modalRef.componentInstance.message = message;

    modalRef.result.then(
      (send: Message) => {
        Swal.fire(
          this.transloco.translate('Message sent succesfully'),
          send.title,
          'success'
        );
      },
      () => {}
    );
  }

  composeMessage() {
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
      (message: Message) => {
        Swal.fire(
          this.transloco.translate('Message sent succesfully'),
          message.title,
          'success'
        );
      },
      () => {}
    );
  }
}
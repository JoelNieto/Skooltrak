import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'skooltrak-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.sass'],
})
export class MessageDetailComponent {
  @Input() message: Message;
  constructor(public activeModal: NgbActiveModal) {}

  formatDate(date: Date) {
    return format(new Date(date), 'EEE, d MMM yyyy h:mm aaa', { locale: es });
  }
}

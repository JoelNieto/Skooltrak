import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/users.model';

@Component({
  selector: 'skooltrak-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass'],
})
export class EditUserComponent {
  @Input() user: User;
  constructor(public modal: NgbActiveModal) {}
}

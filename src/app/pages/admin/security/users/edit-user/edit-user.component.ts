import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/models/users.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass'],
})
export class EditUserComponent implements OnInit {
  @Input() user: User;
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}

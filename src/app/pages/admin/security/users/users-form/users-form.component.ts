import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/users.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.sass']
})
export class UsersFormComponent implements OnInit {
  @Input() user: User;

  userForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [this.user ? this.user.id : ''],
      displayName: [this.user ? this.user.displayName : ''],
      email: [this.user ? this.user.email : '']
    });
  }

}

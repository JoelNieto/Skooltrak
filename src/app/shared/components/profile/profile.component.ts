import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models/users.model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  profile: User;
  profileForm: FormGroup;
  constructor(private session: SessionService, private fb: FormBuilder) {}

  ngOnInit() {
    this.profile = this.session.currentUser;
    this.profileForm = this.fb.group({
      userName: [this.profile.userName, [Validators.required]],
      displayName: [this.profile.displayName, [Validators.required]],
      email: [this.profile.email, [Validators.required]]
    });
  }
}

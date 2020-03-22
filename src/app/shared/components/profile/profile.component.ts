import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/users.model';
import { FilesService } from '../../services/files.service';
import { SessionService } from '../../services/session.service';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  profile: User;
  profileForm: FormGroup;
  constructor(
    public session: SessionService,
    private fb: FormBuilder,
    private user: UsersService,
    private transloco: TranslocoService,
    private filesService: FilesService
  ) {}

  ngOnInit() {
    this.profile = this.session.currentUser;
    this.profileForm = this.fb.group({
      userName: [this.profile.userName, [Validators.required]],
      displayName: [this.profile.displayName, [Validators.required]],
      email: [this.profile.email, [Validators.required]]
    });
  }

  changeAvatar(event: any): void {
    event.preventDefault();
    const element: HTMLElement = document.getElementById('avatar');
    element.click();
  }

  setAvatar(file: any): void {
    this.filesService.uploadFile(file).subscribe(
      res => {
        this.user
          .changeAvatar(this.session.currentUser.id, res.id)
          .subscribe(() => {
            this.session.currentUser.photoURL = res.id;
            Swal.fire(
              this.transloco.translate('Profile picture updated'),
              '',
              'success'
            );
          });
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          err.message,
          'error'
        );
      }
    );
  }
}

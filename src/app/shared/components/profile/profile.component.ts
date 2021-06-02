import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { User } from '../../models/users.model';
import { FilesService } from '../../services/files.service';
import { SessionService } from '../../services/session.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
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
      email: [this.profile.email, [Validators.required, Validators.email]],
      notificationMails: this.profile.notificationMails
        ? this.fb.array(this.initEmails())
        : this.fb.array([]),
    });
  }

  changeAvatar(event: any): void {
    event.preventDefault();
    const element: HTMLElement = document.getElementById('avatar');
    element.click();
  }

  get emails(): FormArray {
    return this.profileForm.get('notificationMails') as FormArray;
  }

  addEmail() {
    const controls = this.profileForm.get('notificationMails') as FormArray;
    controls.push(new FormControl('', [Validators.email]));
  }

  initEmail(email?: string): FormControl {
    return this.fb.control(email, [Validators.required, Validators.email]);
  }

  initEmails(): FormControl[] {
    const controls: FormControl[] = [];
    if (!this.profile.notificationMails) {
      this.profile.notificationMails = [];
    }
    this.profile.notificationMails.forEach((mail) => {
      controls.push(this.initEmail(mail));
    });
    return controls;
  }

  removeEmail(i: number) {
    const controls = this.profileForm.controls.notificationMails as FormArray;
    controls.removeAt(i);
  }

  updateProfile() {
    this.user.updateInfo(this.profile.id, this.profileForm.value).subscribe(
      () => {
        this.session.currentUser.displayName =
          this.profileForm.value.displayName;
        this.session.currentUser.email = this.profileForm.value.email;
        this.session.currentUser.userName = this.profileForm.value.userName;
        this.session.currentUser.notificationMails =
          this.profileForm.value.notificationMails;
        Swal.fire(
          '',
          this.transloco.translate('Updated item', {
            value: this.transloco.translate('Profile'),
          }),
          'success'
        );
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

  setAvatar(file: any): void {
    this.filesService
      .uploadFile(file)
      .pipe(
        mergeMap((resp) =>
          combineLatest([
            this.user.changeAvatar(this.session.currentUser.id, resp.id),
            of(resp),
          ])
        )
      )
      .subscribe(
        ([value, resp]) => {
          this.session.currentUser.photoURL = resp.id;
          Swal.fire(
            this.transloco.translate('Profile picture updated'),
            '',
            'success'
          );
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

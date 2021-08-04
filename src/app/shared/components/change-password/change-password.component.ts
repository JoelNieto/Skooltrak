import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import Swal from 'sweetalert2';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass'],
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private translate: TranslocoService
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      },
      { validator: this.passwordConfirm }
    );
  }

  passwordConfirm(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { invalid: true };
  }

  changePassword() {
    this.auth.changePassword(this.passwordForm.get('password').value).subscribe(
      () => {
        Swal.fire(
          this.translate.translate('Ready!'),
          this.translate.translate('Password changed'),
          'success'
        );
      },
      (err) => console.error(err)
    );
  }
}

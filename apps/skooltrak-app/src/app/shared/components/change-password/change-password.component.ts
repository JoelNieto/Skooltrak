import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import Swal from 'sweetalert2';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'skooltrak-change-password',
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
      { validators: this.passwordConfirm }
    );
  }

  passwordConfirm = (g: AbstractControl): ValidationErrors | null =>
    g.get('password').value === g.get('confirmPassword').value
      ? null
      : { invalid: true };

  changePassword(): void {
    this.auth
      .changePassword(this.passwordForm.get('password').value)
      .subscribe({
        next: () => {
          Swal.fire(
            this.translate.translate('Ready!'),
            this.translate.translate('Password changed'),
            'success'
          );
        },
        error: (err) => console.error(err),
      });
  }
}

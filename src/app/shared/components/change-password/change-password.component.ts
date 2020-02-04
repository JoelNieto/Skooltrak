import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['']
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
    this.auth
      .changePassword(this.passwordForm.get('password').value)
      .subscribe(() => {
        Swal.fire(
          this.translate.instant('Ready!'),
          this.translate.instant('Password changed'),
          'success'
        );
      });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass'],
})
export class ResetPasswordComponent {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private translate: TranslocoService
  ) {}

  sendPassword(email: string) {
    this.auth.resetPassword(email).subscribe(
      () => {
        Swal.fire(
          this.translate.translate('Password reseted'),
          this.translate.translate(
            'The new password has been sent to your email'
          ),
          'success'
        );
        this.router.navigate(['/']);
      },
      (err) => console.error(err)
    );
  }
}

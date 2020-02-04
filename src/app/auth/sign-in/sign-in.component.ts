import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Login } from 'src/app/shared/models/users.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { RoleType } from 'src/app/shared/enums/role.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private translate: TranslateService,
    private router: Router,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.session.clearSession();
  }

  signIn(login: Login) {
    this.auth.login(login).subscribe(
      res => {
        this.session.currentUser = res;
        switch (res.role.code) {
          case RoleType.Administrator:
            this.router.navigate(['admin']);
            break;
          case RoleType.Parent:
          case RoleType.Student:
            this.router.navigate(['student']);
            break;
          case RoleType.Teacher:
            this.router.navigate(['teachers']);
            break;
        }
      },
      (err: Error) => {
        Swal.fire(
          this.translate.instant('Try it again'),
          this.translate.instant('Wrong username/email or password'),
          'error'
        );
      }
    );
  }
}

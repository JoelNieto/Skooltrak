import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';
import { RoleType } from 'src/app/shared/enums/role.enum';
import { Login } from 'src/app/shared/models/users.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private transloco: TranslocoService,
    private router: Router,
    private studentService: StudentsService,
    private teachersService: TeachersService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.session.clearSession();
  }

  signIn(login: Login) {
    this.auth.login(login).subscribe(
      (res) => {
        this.session.currentUser = res;
        switch (res.role.code) {
          case RoleType.Administrator:
            this.router.navigate(['admin']);
            break;
          case RoleType.Parent:
          case RoleType.Student:
            this.studentService
              .get(res.people[0].id)
              .pipe(
                map((student) => {
                  this.session.currentStudent = student;
                })
              )
              .subscribe(() => {
                this.router.navigate(['student']);
              });
            break;
          case RoleType.Teacher:
            this.teachersService
              .get(res.people[0].id)
              .pipe(
                map((teacher) => {
                  this.session.currentTeacher = teacher;
                })
              )
              .subscribe(() => {
                this.router.navigate(['teachers']);
              });
            break;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.status !== 401) {
          Swal.fire(
            this.transloco.translate('Try it again'),
            this.transloco.translate('Wrong username/email or password'),
            'error'
          );
        } else {
          Swal.fire(
            this.transloco.translate('Access denied'),
            this.transloco.translate('Please contact administration'),
            'error'
          );
        }
      }
    );
  }
}

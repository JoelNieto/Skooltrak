import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';
import { RoleType } from 'src/app/shared/enums/role.enum';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { School } from 'src/app/shared/models/schools.model';
import { Login } from 'src/app/shared/models/users.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PeriodsService } from 'src/app/shared/services/periods.service';
import { SchoolsService } from 'src/app/shared/services/schools.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  school: School;
  loginForm: FormGroup;
  constructor(
    private auth: AuthenticationService,
    private transloco: TranslocoService,
    private router: Router,
    public schoolService: SchoolsService,
    private studentService: StudentsService,
    private teachersService: TeachersService,
    private periodsService: PeriodsService,
    private storage: StorageService,
    private session: SessionService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.schoolService.getDefault().subscribe((res) => {
      this.school = res;
    });
    this.session.clearSession();
  }

  signIn() {
    this.auth.login(this.loginForm.value).subscribe(
      (res) => {
        this.session.currentUser = res;
        this.periodsService
          .getAll()
          .pipe(
            map((periods) => {
              this.storage.setOnStorage(StorageEnum.Periods, periods);
            })
          )
          .subscribe(() => {});
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

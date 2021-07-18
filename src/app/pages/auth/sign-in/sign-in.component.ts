import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { RoleType } from 'src/app/shared/enums/role.enum';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { School } from 'src/app/shared/models/schools.model';
import { User } from 'src/app/shared/models/users.model';
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
    this.schoolService.getDefault().subscribe(
      (res) => {
        this.school = res;
      },
      (err) => console.error(err)
    );
    this.session.clearSession();
    this.storage.clean();
  }

  signIn() {
    Swal.fire({
      title: 'Iniciando sesión',
      html: 'Cargando...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.auth
      .login(this.loginForm.value)
      .pipe(
        mergeMap((user) => {
          this.storage.setOnStorage(StorageEnum.User, user);
          this.session.currentUser = user;
          return of(user);
        }),
        mergeMap((user) => {
          switch (user.role.code) {
            case RoleType.Administrator:
              return this.adminSign();
            case RoleType.Teacher:
              return this.teachersSign(user);
            case RoleType.Student:
              return this.studentsSign(user);
          }
        })
      )
      .subscribe(
        () => {
          console.info('=== Sesión iniciada ===');
          Swal.close();
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.showAlert(err);
        }
      );
  }

  adminSign = () => this.router.navigate(['admin']);

  teachersSign = (user: User) =>
    this.teachersService.get(user.people[0].id).pipe(
      mergeMap((teacher) => {
        this.storage.setOnStorage(StorageEnum.CurrentTeacher, teacher);
        this.session.currentTeacher = teacher;
        return of(teacher);
      }),
      mergeMap(() => this.router.navigate(['teachers']))
    );

  studentsSign = (user: User) =>
    this.studentService.get(user.people[0].id).pipe(
      mergeMap((student) => {
        this.storage.setOnStorage(StorageEnum.CurrentStudent, student);
        this.session.currentStudent = student;
        return of(student);
      }),
      mergeMap(() => this.router.navigate(['student']))
    );

  showAlert(err: HttpErrorResponse) {
    switch (err.status) {
      case HttpStatusCode.Unauthorized:
        Swal.fire(
          this.transloco.translate('Access denied'),
          this.transloco.translate('Please contact administration'),
          'error'
        );
        break;
      case HttpStatusCode.NotFound:
        Swal.fire(
          this.transloco.translate('Try it again'),
          this.transloco.translate('Wrong username/email or password'),
          'error'
        );
        break;
      default:
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate('Please contact administration'),
          'error'
        );
        break;
    }
  }
}

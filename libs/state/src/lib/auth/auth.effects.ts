import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';

import { AuthActions } from './auth.actions';
import { ADMIN_LINKS, STUDENT_LINKS, TEACHER_LINKS } from './auth.links';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  // SIGN IN
  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(({ username, password }) =>
        this.service.login(username, password).pipe(
          map(({ token, role }) => AuthActions.signInSuccess({ token, role })),
          catchError((error) => of(AuthActions.signInFailure({ error })))
        )
      )
    );
  });

  signInSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() =>
          this.snackBar.open(this.translate.instant('Welcome'), undefined, {
            panelClass: ['alert', 'success'],
          })
        )
      );
    },
    { dispatch: false }
  );

  signInFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signInFailure),
        tap(({ error }) => console.error(error)),
        map(() =>
          this.snackBar.open('Something went wrong', undefined, {
            panelClass: ['alert', 'failure'],
          })
        )
      );
    },
    { dispatch: false }
  );

  // LINKS

  setAdminLinks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserInfoSuccess),
      filter(({ user }) => user.role === 'admin'),
      map(() => AuthActions.setLinks({ links: ADMIN_LINKS }))
    );
  });

  setTeacherLinks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserInfoSuccess),
      filter(({ user }) => user.role === 'teacher'),
      map(() => AuthActions.setLinks({ links: TEACHER_LINKS }))
    );
  });

  setStudentsLinks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserInfoSuccess),
      filter(({ user }) => user.role === 'student'),
      map(() => AuthActions.setLinks({ links: STUDENT_LINKS }))
    );
  });

  // LOAD USER INFO

  loadUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserInfo),
      switchMap(() =>
        this.service.getProfile().pipe(
          map((user) => AuthActions.loadUserInfoSuccess({ user })),
          catchError((error) => of(AuthActions.loadUserInfoFailure()))
        )
      )
    );
  });

  loadTeacherProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserInfoSuccess),
      filter(({ user }) => user.role === 'teacher'),
      switchMap(() =>
        this.service
          .getTeacher()
          .pipe(map((profile) => AuthActions.loadProfile({ profile })))
      )
    );
  });

  loadStudentProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserInfoSuccess),
      filter(({ user }) => user.role === 'student'),
      switchMap(() =>
        this.service
          .getStudent()
          .pipe(map((profile) => AuthActions.loadProfile({ profile })))
      )
    );
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(() =>
        this.service.logout().pipe(map(() => AuthActions.loadUserInfo()))
      )
    );
  });

  changeAvatar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.changeAvatar),
      switchMap(({ file }) =>
        this.service
          .uploadAvatar(file)
          .pipe(
            map(({ url }) =>
              AuthActions.changeAvatarSuccess({ profileURL: url })
            )
          )
      )
    );
  });

  changeAvatarSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.changeAvatarSuccess),
        map(() =>
          this.snackBar.open(
            this.translate.instant('Avatar updated'),
            undefined,
            {
              panelClass: ['alert', 'success'],
            }
          )
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private translate: TranslateService,
    private readonly service: AuthService,
    private snackBar: MatSnackBar
  ) {}
}

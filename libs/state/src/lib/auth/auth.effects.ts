import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';

import { AuthActions } from './auth.actions';
import { ADMIN_LINKS, TEACHER_LINKS } from './auth.links';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
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

  signInSuccessAdmin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        filter(({ role }) => role === 'admin'),
        map(() => this.router.navigate(['admin']))
      );
    },
    { dispatch: false }
  );

  signInSuccessTeacher$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        filter(({ role }) => role === 'teacher'),
        map(() => this.router.navigate(['teacher']))
      );
    },
    { dispatch: false }
  );

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

  loadUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserInfo),
      switchMap(() =>
        this.service
          .getProfile()
          .pipe(map((user) => AuthActions.loadUserInfoSuccess({ user })))
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

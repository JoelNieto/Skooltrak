import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthActions } from './auth.actions';
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
          this.snackBar.open('Welcome', undefined, {
            panelClass: ['alert', 'success'],
          })
        ),
        map(() => this.router.navigate(['admin']))
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

  loadProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadProfile),
      switchMap(() =>
        this.service
          .getProfile()
          .pipe(map((user) => AuthActions.loadProfileSuccess({ user })))
      )
    );
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(() =>
        this.service.logout().pipe(map(() => AuthActions.loadProfile()))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private readonly service: AuthService,
    private snackBar: MatSnackBar
  ) {}
}

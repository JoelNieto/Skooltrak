import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { TeachersActions } from './teachers.actions';
import { TeachersService } from './teachers.service';

@Injectable()
export class TeachersEffects {
  loadTeachers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeachersActions.initTeachers),
      switchMap(() =>
        this.service.getAll().pipe(
          map((payload) => TeachersActions.loadTeachersSuccess({ payload })),
          catchError((error) =>
            of(TeachersActions.loadTeachersFailure({ error }))
          )
        )
      )
    );
  });

  createTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeachersActions.createTeacher),
      switchMap(({ request }) =>
        this.service.post(request).pipe(
          map((payload) => TeachersActions.createTeacherSuccess({ payload })),
          catchError((error) =>
            of(TeachersActions.createTeacherFailure({ error }))
          )
        )
      )
    );
  });

  createTeacherSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TeachersActions.createTeacherSuccess),
        map(() =>
          this.snackBar.open(
            this.translate.instant('Item created successfully'),
            undefined,
            { panelClass: ['alert', 'success'] }
          )
        )
      );
    },
    { dispatch: false }
  );

  createTeacherFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TeachersActions.createTeacherFailure),
        tap(({ error }) => console.error(error)),
        map(() =>
          this.snackBar.open(
            this.translate.instant('Something went wrong'),
            undefined,
            { panelClass: ['alert', 'failure'] }
          )
        )
      );
    },
    { dispatch: false }
  );

  updateTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeachersActions.editTeacher),
      switchMap(({ id, request }) =>
        this.service.patch(id, request).pipe(
          map((changes) => TeachersActions.editTeacherSuccess({ id, changes })),
          catchError((error) =>
            of(TeachersActions.editTeacherFailure({ error }))
          )
        )
      )
    );
  });

  updateTeacherSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TeachersActions.editTeacherSuccess),
        map(() =>
          this.snackBar.open(
            this.translate.instant('Item updated successfully'),
            undefined,
            { panelClass: ['alert', 'success'] }
          )
        )
      );
    },
    { dispatch: false }
  );

  updateTeacherFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TeachersActions.editTeacherFailure),
        tap(({ error }) => console.log(error)),
        map(() =>
          this.snackBar.open(
            this.translate.instant('Something went wrong'),
            undefined,
            { panelClass: ['alert', 'failure'] }
          )
        )
      );
    },
    { dispatch: false }
  );

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TeachersActions.deleteTeacher),
      switchMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => TeachersActions.deleteTeacherSuccess({ id })),
          catchError((error) =>
            of(TeachersActions.deleteTeacherFailure({ error }))
          )
        )
      )
    );
  });

  deleteTeacherSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TeachersActions.deleteTeacherSuccess),
        map(() =>
          this.snackBar.open(
            this.translate.instant('Item deleted successfully'),
            undefined,
            { panelClass: ['alert', 'success'] }
          )
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: TeachersService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}
}

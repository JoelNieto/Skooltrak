import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { SchoolsActions } from '../schools';
import { DegreesActions } from './degrees.actions';
import { DegreesService } from './degrees.service';

@Injectable()
export class DegreesEffects {
  loadDegrees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DegreesActions.initDegrees),
      switchMap(() =>
        this.service.getAll().pipe(
          map((payload) => DegreesActions.loadDegreesSuccess({ payload })),
          catchError((error) =>
            of(DegreesActions.loadDegreesFailure({ error }))
          )
        )
      )
    );
  });

  loadSchools$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DegreesActions.initDegrees),
      map(() => SchoolsActions.loadSchools())
    );
  });

  createDegree$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DegreesActions.createDegree),
      switchMap(({ request }) =>
        this.service.post(request).pipe(
          map((payload) => DegreesActions.createDegreeSuccess({ payload })),
          catchError((error) =>
            of(DegreesActions.createDegreeFailure({ error }))
          )
        )
      )
    );
  });

  createDegreeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DegreesActions.createDegreeSuccess),
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

  createDegreeFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DegreesActions.createDegreeFailure),
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

  updateDegree$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DegreesActions.editDegree),
      switchMap(({ id, request }) =>
        this.service.patch(id, request).pipe(
          map((changes) => DegreesActions.editDegreeSuccess({ id, changes })),
          catchError((error) => of(DegreesActions.editDegreeFailure({ error })))
        )
      )
    );
  });

  updateDegreeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DegreesActions.editDegreeSuccess),
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

  updateDegreeFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DegreesActions.editDegreeFailure),
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

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DegreesActions.deleteDegree),
      switchMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => DegreesActions.deleteDegreeSuccess({ id })),
          catchError((error) =>
            of(DegreesActions.deleteDegreeFailure({ error }))
          )
        )
      )
    );
  });

  deleteDegreeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DegreesActions.deleteDegreeSuccess),
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
    private service: DegreesService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}
}

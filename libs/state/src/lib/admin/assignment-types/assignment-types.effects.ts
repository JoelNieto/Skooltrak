import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AssignmentTypesActions } from './assignment-types.actions';
import { AssignmentTypesService } from './assignment-types.service';

@Injectable()
export class AssignmentTypesEffects {
  loadAssignmentTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AssignmentTypesActions.initAssignmentTypes),
      switchMap(() =>
        this.service.getAll().pipe(
          map((payload) =>
            AssignmentTypesActions.loadAssignmentTypesSuccess({ payload })
          ),
          catchError((error) =>
            of(AssignmentTypesActions.loadAssignmentTypesFailure({ error }))
          )
        )
      )
    );
  });

  createAssignmentType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AssignmentTypesActions.createAssignmentType),
      switchMap(({ request }) =>
        this.service.post(request).pipe(
          map((payload) =>
            AssignmentTypesActions.createAssignmentTypeSuccess({ payload })
          ),
          catchError((error) =>
            of(AssignmentTypesActions.createAssignmentTypeFailure({ error }))
          )
        )
      )
    );
  });

  createAssignmentTypeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AssignmentTypesActions.createAssignmentTypeSuccess),
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

  createAssignmentTypeFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AssignmentTypesActions.createAssignmentTypeFailure),
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

  updateAssignmentType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AssignmentTypesActions.editAssignmentType),
      switchMap(({ id, request }) =>
        this.service.patch(id, request).pipe(
          map((changes) =>
            AssignmentTypesActions.editAssignmentTypeSuccess({ id, changes })
          ),
          catchError((error) =>
            of(AssignmentTypesActions.editAssignmentTypeFailure({ error }))
          )
        )
      )
    );
  });

  updateAssignmentTypeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AssignmentTypesActions.editAssignmentTypeSuccess),
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

  updateAssignmentTypeFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AssignmentTypesActions.editAssignmentTypeFailure),
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
      ofType(AssignmentTypesActions.deleteAssignmentType),
      switchMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => AssignmentTypesActions.deleteAssignmentTypeSuccess({ id })),
          catchError((error) =>
            of(AssignmentTypesActions.deleteAssignmentTypeFailure({ error }))
          )
        )
      )
    );
  });

  deleteAssignmentTypeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AssignmentTypesActions.deleteAssignmentTypeSuccess),
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
    private service: AssignmentTypesService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}
}

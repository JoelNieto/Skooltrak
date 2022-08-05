import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ClassGroupsActions } from './class-groups.actions';
import { ClassGroupsService } from './class-groups.service';

@Injectable()
export class ClassGroupsEffects {
  loadClassGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClassGroupsActions.initClassGroups),
      switchMap(() =>
        this.service.getAll().pipe(
          map((payload) =>
            ClassGroupsActions.loadClassGroupsSuccess({ payload })
          ),
          catchError((error) =>
            of(ClassGroupsActions.loadClassGroupsFailure({ error }))
          )
        )
      )
    );
  });

  createClassGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClassGroupsActions.createClassGroup),
      switchMap(({ request }) =>
        this.service.post(request).pipe(
          map((payload) =>
            ClassGroupsActions.createClassGroupSuccess({ payload })
          ),
          catchError((error) =>
            of(ClassGroupsActions.createClassGroupFailure({ error }))
          )
        )
      )
    );
  });

  createClassGroupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ClassGroupsActions.createClassGroupSuccess),
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

  createClassGroupFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ClassGroupsActions.createClassGroupFailure),
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

  updateClassGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClassGroupsActions.editClassGroup),
      switchMap(({ id, request }) =>
        this.service.patch(id, request).pipe(
          map((changes) =>
            ClassGroupsActions.editClassGroupSuccess({ id, changes })
          ),
          catchError((error) =>
            of(ClassGroupsActions.editClassGroupFailure({ error }))
          )
        )
      )
    );
  });

  updateClassGroupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ClassGroupsActions.editClassGroupSuccess),
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

  updateClassGroupFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ClassGroupsActions.editClassGroupFailure),
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
      ofType(ClassGroupsActions.deleteClassGroup),
      switchMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ClassGroupsActions.deleteClassGroupSuccess({ id })),
          catchError((error) =>
            of(ClassGroupsActions.deleteClassGroupFailure({ error }))
          )
        )
      )
    );
  });

  deleteClassGroupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ClassGroupsActions.deleteClassGroupSuccess),
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
    private service: ClassGroupsService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}
}

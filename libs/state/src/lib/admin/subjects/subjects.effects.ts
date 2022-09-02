import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { SchoolsActions } from '../schools';
import { SubjectsActions } from './subjects.actions';
import { SubjectsService } from './subjects.service';

@Injectable()
export class SubjectsEffects {
  loadSubjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubjectsActions.initSubjects),
      switchMap(() =>
        this.service.getAll().pipe(
          map((payload) => SubjectsActions.loadSubjectsSuccess({ payload })),
          catchError((error) =>
            of(SubjectsActions.loadSubjectsFailure({ error }))
          )
        )
      )
    );
  });

  loadSchools$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubjectsActions.initSubjects),
      map(() => SchoolsActions.loadSchools())
    );
  });

  createSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubjectsActions.createSubject),
      switchMap(({ request }) =>
        this.service.post(request).pipe(
          map((payload) => SubjectsActions.createSubjectSuccess({ payload })),
          catchError((error) =>
            of(SubjectsActions.createSubjectFailure({ error }))
          )
        )
      )
    );
  });

  createSubjectSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SubjectsActions.createSubjectSuccess),
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

  createSubjectFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SubjectsActions.createSubjectFailure),
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

  updateSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubjectsActions.editSubject),
      switchMap(({ id, request }) =>
        this.service.patch(id, request).pipe(
          map((changes) => SubjectsActions.editSubjectSuccess({ id, changes })),
          catchError((error) =>
            of(SubjectsActions.editSubjectFailure({ error }))
          )
        )
      )
    );
  });

  updateSubjectSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SubjectsActions.editSubjectSuccess),
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

  updateSubjectFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SubjectsActions.editSubjectFailure),
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
      ofType(SubjectsActions.deleteSubject),
      switchMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => SubjectsActions.deleteSubjectSuccess({ id })),
          catchError((error) =>
            of(SubjectsActions.deleteSubjectFailure({ error }))
          )
        )
      )
    );
  });

  deleteSubjectSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SubjectsActions.deleteSubjectSuccess),
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
    private service: SubjectsService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { DegreesActions } from '../degrees';
import { SchoolsActions } from '../schools';
import { PlansActions } from './study-plans.actions';
import { StudyPlansService } from './study-plans.service';

@Injectable()
export class StudyPlansEffects {
  loadStudyPlans$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlansActions.initStudyPlans),
      switchMap(() =>
        this.service.getAll().pipe(
          map((payload) => PlansActions.loadStudyPlansSuccess({ payload })),
          catchError((error) =>
            of(PlansActions.loadStudyPlansFailure({ error }))
          )
        )
      )
    );
  });

  loadSchools$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlansActions.initStudyPlans),
      map(() => SchoolsActions.loadSchools())
    );
  });

  loadDegrees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlansActions.initStudyPlans),
      map(() => DegreesActions.initDegrees())
    );
  });

  createStudyPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlansActions.createStudyPlan),
      switchMap(({ request }) =>
        this.service.post(request).pipe(
          map((payload) => PlansActions.createStudyPlanSuccess({ payload })),
          catchError((error) =>
            of(PlansActions.createStudyPlanFailure({ error }))
          )
        )
      )
    );
  });

  createStudyPlanSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PlansActions.createStudyPlanSuccess),
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

  createStudyPlanFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PlansActions.createStudyPlanFailure),
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

  updateStudyPlan$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlansActions.editStudyPlan),
      switchMap(({ id, request }) =>
        this.service.patch(id, request).pipe(
          map((changes) => PlansActions.editStudyPlanSuccess({ id, changes })),
          catchError((error) =>
            of(PlansActions.editStudyPlanFailure({ error }))
          )
        )
      )
    );
  });

  updateStudyPlanSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PlansActions.editStudyPlanSuccess),
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

  updateStudyPlanFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PlansActions.editStudyPlanFailure),
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
      ofType(PlansActions.deleteStudyPlan),
      switchMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => PlansActions.deleteStudyPlanSuccess({ id })),
          catchError((error) =>
            of(PlansActions.deleteStudyPlanFailure({ error }))
          )
        )
      )
    );
  });

  deleteStudyPlanSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PlansActions.deleteStudyPlanSuccess),
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
    private service: StudyPlansService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}
}

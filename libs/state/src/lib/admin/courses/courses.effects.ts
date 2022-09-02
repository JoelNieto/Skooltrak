import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { PlansActions } from '../study-plans/study-plans.actions';
import { SubjectsActions } from '../subjects';
import { TeachersActions } from '../teachers';
import { CoursesActions } from './courses.actions';
import { CoursesService } from './courses.service';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.initCourses),
      switchMap(() =>
        this.service.getAll().pipe(
          map((payload) => CoursesActions.loadCoursesSuccess({ payload })),
          catchError((error) =>
            of(CoursesActions.loadCoursesFailure({ error }))
          )
        )
      )
    );
  });

  loadSubjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.initCourses),
      map(() => SubjectsActions.initSubjects())
    );
  });
  loadPlans$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.initCourses),
      map(() => PlansActions.initStudyPlans())
    );
  });

  loadTeachers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.initCourses),
      map(() => TeachersActions.initTeachers())
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.createCourse),
      switchMap(({ request }) =>
        this.service.post(request).pipe(
          map((payload) => CoursesActions.createCourseSuccess({ payload })),
          catchError((error) =>
            of(CoursesActions.createCourseFailure({ error }))
          )
        )
      )
    );
  });

  createCourseSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CoursesActions.createCourseSuccess),
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

  createCourseFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CoursesActions.createCourseFailure),
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

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.editCourse),
      switchMap(({ id, request }) =>
        this.service.patch(id, request).pipe(
          map((changes) => CoursesActions.editCourseSuccess({ id, changes })),
          catchError((error) => of(CoursesActions.editCourseFailure({ error })))
        )
      )
    );
  });

  updateCourseSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CoursesActions.editCourseSuccess),
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

  updateCourseFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CoursesActions.editCourseFailure),
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
      ofType(CoursesActions.deleteCourse),
      switchMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => CoursesActions.deleteCourseSuccess({ id })),
          catchError((error) =>
            of(CoursesActions.deleteCourseFailure({ error }))
          )
        )
      )
    );
  });

  deleteCourseSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CoursesActions.deleteCourseSuccess),
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
    private service: CoursesService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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

  constructor(private actions$: Actions, private service: CoursesService) {}
}

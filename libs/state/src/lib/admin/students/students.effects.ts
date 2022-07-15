import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as StudentsActions from './students.actions';


@Injectable()
export class StudentsEffects {

  loadStudentss$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(StudentsActions.loadStudentss),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => StudentsActions.loadStudentssSuccess({ data })),
          catchError(error => of(StudentsActions.loadStudentssFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}

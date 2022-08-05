import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { StudentsActions } from './students.actions';
import { StudentsService } from './students.service';

@Injectable()
export class StudentsEffects {
  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      switchMap(() =>
        this.service.getAll().pipe(
          map((payload) => StudentsActions.loadStudentsSuccess({ payload })),
          catchError((error) =>
            of(StudentsActions.loadStudentsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private service: StudentsService) {}
}

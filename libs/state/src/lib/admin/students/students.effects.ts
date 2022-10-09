import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ClassGroupsActions } from '../class-groups';
import { SchoolsActions } from '../schools';
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

  loadSchools$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      map(() => SchoolsActions.loadSchools())
    );
  });

  loadGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      map(() => ClassGroupsActions.initClassGroups())
    );
  });

  createStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.createStudent),
      switchMap(({ request }) =>
        this.service.post(request).pipe(
          map((payload) => StudentsActions.createStudentSuccess({ payload })),
          catchError(({ error }) =>
            of(StudentsActions.createStudentFailure({ error }))
          )
        )
      )
    );
  });

  createStudentSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.createStudentSuccess),
      tap(({ payload }) =>
        this.router.navigate(['/students', 'details'], {
          queryParams: { id: payload._id },
        })
      ),
      tap(() =>
        this.snackBar.open(
          this.translate.instant('Item created successfully'),
          undefined,
          { panelClass: ['alert', 'success'] }
        )
      ),
      switchMap(({ payload }) =>
        of(StudentsActions.setStudent({ id: payload._id }))
      )
    );
  });

  createStudentFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(StudentsActions.createStudentFailure),
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

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.updateStudent),
      switchMap(({ id, request }) =>
        this.service
          .patch(id, request)
          .pipe(
            map((changes) =>
              StudentsActions.updateStudentSuccess({ id, changes })
            )
          )
      )
    );
  });

  updateStudentSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.updateStudentSuccess),
      tap(() =>
        this.snackBar.open(
          this.translate.instant('Item created successfully'),
          undefined,
          { panelClass: ['alert', 'success'] }
        )
      ),
      tap(({ id }) =>
        this.router.navigate(['/students', 'details'], { queryParams: { id } })
      ),
      switchMap(({ id }) => of(StudentsActions.setStudent({ id })))
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly service: StudentsService,
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService,
    private readonly router: Router
  ) {}
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { SchoolsActions } from './schools.actions';
import { SchoolsService } from './schools.service';

@Injectable()
export class SchoolsEffects {
  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchoolsActions.loadSchools),

      switchMap(() =>
        this.service.getAll().pipe(
          map((payload) => SchoolsActions.loadSchoolSuccess({ payload })),
          catchError((error) => of(SchoolsActions.loadSchoolFailure({ error })))
        )
      )
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchoolsActions.createSchool),
      switchMap(({ request }) =>
        this.service.post(request).pipe(
          map((payload) => SchoolsActions.createSchoolSuccess({ payload })),
          catchError((error) =>
            of(SchoolsActions.createSchoolFailure({ error }))
          )
        )
      )
    );
  });

  createSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SchoolsActions.createSchoolSuccess),
        tap(() =>
          this.snackBar.open(
            this.translate.instant('Item created successfully'),
            undefined,
            { panelClass: ['alert', 'success'] }
          )
        ),
        map(() => this.router.navigate(['admin/schools']))
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: SchoolsService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}
}

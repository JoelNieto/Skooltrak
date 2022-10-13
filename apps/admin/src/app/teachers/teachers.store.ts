import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { Teacher } from '@skooltrak-app/models';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { TeachersService } from './teachers.service';

interface State {
  teachers: Teacher[];
  loading: boolean;
  selected?: string | undefined;
}

@Injectable()
export class TeachersStore extends ComponentStore<State> {
  constructor(
    private service: TeachersService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    super({ teachers: [], loading: true });
  }

  // SELECTORS

  readonly teachers$ = this.select((state) => state.teachers);
  readonly selectedTeacher$ = this.select((state) =>
    state.selected ? state.teachers.find((x) => x._id === state.selected) : null
  );

  // UPDATERS

  private readonly setTeachers = this.updater(
    (state, teachers: Teacher[]): State => ({ ...state, teachers })
  );

  private readonly addTeacher = this.updater(
    (state, type: Teacher): State => ({
      ...state,
      ...{ teachers: [...state.teachers, type] },
    })
  );

  private readonly updateTeacher = this.updater(
    (state, updatedTeacher: Teacher): State => ({
      ...state,
      ...{
        teachers: state.teachers.map((type) =>
          type._id === updatedTeacher._id ? updatedTeacher : type
        ),
      },
    })
  );

  private readonly removeTeacher = this.updater(
    (state, id: string): State => ({
      ...state,
      ...{ teachers: state.teachers.filter((x) => x._id !== id) },
    })
  );

  private readonly setLoading = this.updater(
    (state, loading: boolean): State => ({
      ...state,
      loading,
    })
  );

  readonly setSelected = this.updater(
    (state, selected: string | undefined): State => ({ ...state, selected })
  );

  // EFFECTS

  readonly fetchTeachers = this.effect(() => {
    return this.service.getAll().pipe(
      catchError((error) => {
        console.error(error);
        this.setLoading(false);
        this.snackBar.open(
          this.translate.instant('Something went wrong'),
          undefined,
          { panelClass: ['alert', 'failure'] }
        );
        return of([]);
      }),
      map((teachers) => this.setTeachers(teachers)),
      tap(() => this.setLoading(false))
    );
  });

  readonly createTeacher = this.effect((request$: Observable<Teacher>) => {
    return request$.pipe(
      switchMap((request) =>
        this.service.post(request).pipe(
          map((type) => this.addTeacher(type)),
          tap(() =>
            this.snackBar.open(
              this.translate.instant('Item created successfully'),
              undefined,
              { panelClass: ['alert', 'success'] }
            )
          ),
          catchError((error) => {
            console.error(error);
            return of(
              this.snackBar.open(
                this.translate.instant('Something went wrong'),
                undefined,
                { panelClass: ['alert', 'failure'] }
              )
            );
          })
        )
      )
    );
  });

  readonly patchTeacher = this.effect(
    (request$: Observable<{ id: string; request: Teacher }>) => {
      return request$.pipe(
        switchMap(({ id, request }) =>
          this.service.patch(id, request).pipe(
            map((payload) => this.updateTeacher(payload)),
            tap(() =>
              this.snackBar.open(
                this.translate.instant('Item updated successfully'),
                undefined,
                { panelClass: ['alert', 'success'] }
              )
            ),
            catchError((error) => {
              console.error(error);
              return of(
                this.snackBar.open(
                  this.translate.instant('Something went wrong'),
                  undefined,
                  { panelClass: ['alert', 'failure'] }
                )
              );
            })
          )
        )
      );
    }
  );

  readonly deleteTeacher = this.effect((request$: Observable<string>) => {
    return request$.pipe(
      switchMap((id) =>
        this.service.delete(id).pipe(
          map(() => this.removeTeacher(id)),
          tap(() =>
            this.snackBar.open(
              this.translate.instant('Item deleted successfully'),
              undefined,
              { panelClass: ['alert', 'success'] }
            )
          ),
          catchError((error) => {
            console.error(error);
            return of(
              this.snackBar.open(
                this.translate.instant('Something went wrong'),
                undefined,
                { panelClass: ['alert', 'failure'] }
              )
            );
          })
        )
      )
    );
  });
}

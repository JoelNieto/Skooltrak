import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { Student } from '@skooltrak-app/models';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { StudentsService } from './students.service';

interface State {
  students: Student[];
  loading: boolean;
  selected?: string | undefined;
}

@Injectable()
export class StudentsStore
  extends ComponentStore<State>
  implements OnStoreInit
{
  private service = inject(StudentsService);
  private snackBar = inject(MatSnackBar);

  private translate = inject(TranslateService);
  private router = inject(Router);

  // SELECTORS

  readonly students$ = this.select((state) => state.students);
  readonly selectedId$ = this.select((state) => state.selected);
  readonly selectedStudent$ = this.select((state) =>
    state.selected ? state.students.find((x) => x._id === state.selected) : null
  );

  readonly loading$ = this.select((state) => state.loading);

  // UPDATERS

  private readonly setStudents = this.updater(
    (state, students: Student[]): State => ({ ...state, students })
  );

  private readonly addStudent = this.updater(
    (state, student: Student): State => ({
      ...state,
      ...{ students: [...state.students, student] },
    })
  );

  private readonly updateStudent = this.updater(
    (state, updatedStudent: Student): State => ({
      ...state,
      ...{
        students: state.students.map((student) =>
          student._id === updatedStudent._id ? updatedStudent : student
        ),
      },
    })
  );

  private readonly removeStudent = this.updater(
    (state, id: string): State => ({
      ...state,
      ...{ students: state.students.filter((x) => x._id !== id) },
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

  readonly fetchStudents = this.effect(() => {
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
      map((students) => this.setStudents(students)),
      tap(() => this.setLoading(false))
    );
  });

  readonly createStudent = this.effect(
    (request$: Observable<Partial<Student>>) => {
      return request$.pipe(
        tap(() => this.setLoading(true)),
        switchMap((request) =>
          this.service.post(request).pipe(
            tap((student) => this.addStudent(student)),
            tap(({ _id: id }) =>
              this.router.navigate(['/students', 'details'], {
                queryParams: { id },
              })
            ),
            tap(() =>
              this.snackBar.open(
                this.translate.instant('Item created successfully'),
                undefined,
                { panelClass: ['alert', 'success'] }
              )
            ),
            tap(() => this.setLoading(false)),
            catchError((error) => {
              console.error(error);
              this.setLoading(false);
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

  readonly patchStudent = this.effect(
    (request$: Observable<{ id: string; request: Partial<Student> }>) => {
      return request$.pipe(
        tap(() => this.setLoading(true)),
        switchMap(({ id, request }) =>
          this.service.patch(id, request).pipe(
            tap((payload) => this.updateStudent(payload)),
            tap(() =>
              this.router.navigate(['/students', 'details'], {
                queryParams: { id },
              })
            ),
            tap(() =>
              this.snackBar.open(
                this.translate.instant('Item updated successfully'),
                undefined,
                { panelClass: ['alert', 'success'] }
              )
            ),
            tap(() => this.setLoading(false)),
            catchError((error) => {
              console.error(error);
              this.setLoading(false);
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

  readonly deleteStudent = this.effect((request$: Observable<string>) => {
    return request$.pipe(
      switchMap((id) =>
        this.service.delete(id).pipe(
          map(() => this.removeStudent(id)),
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

  ngrxOnStoreInit() {
    this.setState({ students: [], loading: true });
  }
}

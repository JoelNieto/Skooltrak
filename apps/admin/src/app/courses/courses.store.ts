import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { Course } from '@skooltrak-app/models';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { CoursesService } from './courses.service';

interface State {
  courses: Course[];
  loading: boolean;
  selected?: string | undefined;
}

@Injectable()
export class CoursesStore extends ComponentStore<State> implements OnStoreInit {
  private service = inject(CoursesService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);
  private router = inject(Router);

  // SELECTORS

  readonly courses$ = this.select((state) => state.courses);
  readonly selectedId$ = this.select((state) => state.selected);
  readonly selectedCourse$ = this.select((state) =>
    state.selected ? state.courses.find((x) => x._id === state.selected) : null
  );

  readonly loading$ = this.select((state) => state.loading);

  // UPDATERS

  private readonly setCourses = this.updater(
    (state, courses: Course[]): State => ({ ...state, courses })
  );

  private readonly addCourse = this.updater(
    (state, course: Course): State => ({
      ...state,
      ...{ courses: [...state.courses, course] },
    })
  );

  private readonly updateCourse = this.updater(
    (state, updatedCourse: Course): State => ({
      ...state,
      ...{
        courses: state.courses.map((course) =>
          course._id === updatedCourse._id ? updatedCourse : course
        ),
      },
    })
  );

  private readonly removeCourse = this.updater(
    (state, id: string): State => ({
      ...state,
      ...{ courses: state.courses.filter((x) => x._id !== id) },
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

  readonly fetchCourses = this.effect(() => {
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
      map((courses) => this.setCourses(courses)),
      tap(() => this.setLoading(false))
    );
  });

  readonly createCourse = this.effect(
    (request$: Observable<Partial<Course>>) => {
      return request$.pipe(
        tap(() => this.setLoading(true)),
        switchMap((request) =>
          this.service.post(request).pipe(
            tap((course) => this.addCourse(course)),
            tap(({ _id: id }) =>
              this.router.navigate(['/courses', 'details'], {
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

  readonly patchCourse = this.effect(
    (request$: Observable<{ id: string; request: Partial<Course> }>) => {
      return request$.pipe(
        tap(() => this.setLoading(true)),
        switchMap(({ id, request }) =>
          this.service.patch(id, request).pipe(
            tap((payload) => this.updateCourse(payload)),
            tap(() =>
              this.router.navigate(['/courses', 'details'], {
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

  readonly deleteCourse = this.effect((request$: Observable<string>) => {
    return request$.pipe(
      switchMap((id) =>
        this.service.delete(id).pipe(
          map(() => this.removeCourse(id)),
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

  ngrxOnStoreInit = () => {
    this.setState({ courses: [], loading: true });
  };
}

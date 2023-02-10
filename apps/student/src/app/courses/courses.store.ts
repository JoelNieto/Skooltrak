import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { Course } from '@skooltrak-app/models';
import { catchError, map, of, tap } from 'rxjs';
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

  ngrxOnStoreInit = () => {
    this.setState({ courses: [], loading: true });
  };
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ClassGroup, Grade, Period } from '@skooltrak-app/models';
import { teacher_courses } from '@skooltrak-app/state';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { CoursesGradesService } from './courses-grades.service';

interface State {
  periods: Period[];
  selectedPeriod?: Period;
  groups: ClassGroup[];
  grades: Grade[];
}

@Injectable()
export class CoursesGradesStore extends ComponentStore<State> {
  constructor(
    private service: CoursesGradesService,
    private state: teacher_courses.CoursesFacade
  ) {
    super({ periods: [], groups: [], grades: [] });
  }

  // SELECTORS
  readonly periods$ = this.select((state) => state.periods);
  readonly groups$ = this.select((state) => state.groups);
  readonly grades$ = this.select((state) => state.grades);
  readonly selectedPeriod$ = this.select((state) => state.selectedPeriod);
  readonly selectedPeriodId$ = this.select(
    (state) => state.selectedPeriod?._id
  );

  // UPDATERS
  readonly setPeriods = this.updater(
    (state, periods: Period[]): State => ({ ...state, periods })
  );

  readonly setGroups = this.updater(
    (state, groups: ClassGroup[]): State => ({ ...state, groups })
  );

  readonly setGrades = this.updater(
    (state, grades: Grade[]): State => ({ ...state, grades })
  );
  readonly setSelectedPeriod = this.updater(
    (state, period: Period): State => ({ ...state, selectedPeriod: period })
  );

  // EFFECTS
  readonly fetchPeriods = this.effect(() => {
    return this.service.getPeriods().pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      }),
      map((periods) => this.setPeriods(periods))
    );
  });

  readonly fetchGrades = this.effect(() => {
    return this.selectedPeriodId$.pipe(
      withLatestFrom(this.state.selectedCourseId$),
      filter(([period, course]) => !!period && !!course),
      switchMap(([period, course]) =>
        this.service.getGrades(course!, period!).pipe(
          catchError((err) => {
            console.error(err);
            return of([]);
          }),
          map((grades) => this.setGrades(grades))
        )
      )
    );
  });

  readonly fetchGroups = this.effect(() => {
    return this.state.selectedCourse$.pipe(
      filter((course) => !!course),
      switchMap((course) =>
        this.service.getGroups(course?.plan._id!).pipe(
          catchError((error) => {
            console.error(error);
            return of([]);
          }),
          map((groups) => this.setGroups(groups))
        )
      )
    );
  });
}

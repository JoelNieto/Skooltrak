/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ClassGroup, GradeType, Period } from '@skooltrak-app/models';
import { teacher_courses } from '@skooltrak-app/state';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { GradesFormService } from './grades-form.service';

interface State {
  periods: Period[];
  types: GradeType[];
  groups: ClassGroup[];
  selectedGroups: ClassGroup[];
}

@Injectable()
export class GradesFormStore extends ComponentStore<State> {
  constructor(
    private readonly service: GradesFormService,
    private readonly state: teacher_courses.CoursesFacade
  ) {
    super({ periods: [], types: [], groups: [], selectedGroups: [] });
  }

  // SELECTORS
  readonly periods$ = this.select((state) => state.periods);
  readonly types$ = this.select((state) => state.types);
  readonly groups$ = this.select((state) => state.groups);
  readonly selectedGroups$ = this.select((state) => state.selectedGroups);

  // UPDATERS
  readonly setPeriods = this.updater(
    (state, periods: Period[]): State => ({ ...state, periods })
  );
  readonly setTypes = this.updater(
    (state, types: GradeType[]): State => ({ ...state, types })
  );
  readonly setGroups = this.updater(
    (state, groups: ClassGroup[]): State => ({ ...state, groups })
  );
  readonly setSelectedGroups = this.updater(
    (state, groups: ClassGroup[]): State => ({
      ...state,
      selectedGroups: groups,
    })
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

  readonly fetchTypes = this.effect(() => {
    return this.state.selectedCourseId$.pipe(
      filter((id) => !!id),
      switchMap((id) =>
        this.service.getTypes(id!).pipe(
          catchError((err) => {
            console.error(err);
            return of([]);
          }),
          map((types) => this.setTypes(types))
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
          tap((groups) => this.setGroups(groups))
        )
      )
    );
  });
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  ClassGroup,
  Course,
  Grade,
  Period,
  Student,
  StudentGrade,
} from '@skooltrak-app/models';
import {
  catchError,
  combineLatestWith,
  filter,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { GradesService } from './grades.service';
interface State {
  courses: Course[];
  selectedCourse?: Course;
  groups: ClassGroup[];
  selectedGroup?: ClassGroup;
  students: Student[];
  periods: Period[];
  selectedPeriod?: Period;
  grades: Grade[];
  scores: StudentGrade[];
}

@Injectable()
export class GradesStore extends ComponentStore<State> {
  constructor(private service: GradesService) {
    super({
      courses: [],
      groups: [],
      students: [],
      periods: [],
      grades: [],
      scores: [],
    });
  }

  // SELECTORS
  readonly courses$ = this.select((state) => state.courses);
  readonly selectedCourse$ = this.select((state) => state.selectedCourse);
  readonly groups$ = this.select((state) => state.groups);
  readonly selectedGroup$ = this.select((state) => state.selectedGroup);
  readonly selectedPeriod$ = this.select((state) => state.selectedPeriod);
  readonly students$ = this.select((state) => state.students);
  readonly periods$ = this.select((state) => state.periods);
  readonly grades$ = this.select((state) => state.grades);

  // UPDATERS
  readonly setCourses = this.updater(
    (state, courses: Course[]): State => ({ ...state, courses })
  );
  readonly setSelectedCourse = this.updater(
    (state, course: Course): State => ({ ...state, selectedCourse: course })
  );
  readonly setGroups = this.updater(
    (state, groups: ClassGroup[]): State => ({ ...state, groups })
  );
  readonly setSelectedGroup = this.updater(
    (state, group: ClassGroup): State => ({ ...state, selectedGroup: group })
  );
  readonly setStudents = this.updater(
    (state, students: Student[]): State => ({ ...state, students })
  );
  readonly setPeriods = this.updater(
    (state, periods: Period[]): State => ({ ...state, periods })
  );

  readonly setSelectedPeriod = this.updater(
    (state, period: Period): State => ({ ...state, selectedPeriod: period })
  );

  readonly setGrades = this.updater(
    (state, grades: Grade[]): State => ({ ...state, grades })
  );

  readonly addGrade = this.updater(
    (state, grade: Grade): State => ({
      ...state,
      grades: [...state.grades, grade],
    })
  );

  readonly updateGrade = this.updater(
    (state, updatedGrade: Grade): State => ({
      ...state,
      ...{
        grades: state.grades.map((grade) =>
          grade._id === updatedGrade._id ? updatedGrade : grade
        ),
      },
    })
  );

  // EFFECTS
  readonly fetchCourses = this.effect(() => {
    return this.service.getCourses().pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      }),
      tap((courses) => this.setCourses(courses))
    );
  });

  readonly selectCourse = this.effect((course$: Observable<Course>) => {
    return course$.pipe(
      tap((course) => this.setSelectedCourse(course)),
      tap(() =>
        this.patchState({ selectedGroup: undefined, students: [], grades: [] })
      )
    );
  });

  readonly fetchGroups = this.effect(() => {
    return this.selectedCourse$.pipe(
      filter((course) => !!course),
      switchMap((course) =>
        this.service.getGroups(course!.plan._id).pipe(
          catchError((err) => {
            console.error(err);
            return of([]);
          }),
          tap((groups) => this.setGroups(groups))
        )
      )
    );
  });

  readonly fetchStudents = this.effect(() => {
    return this.selectedGroup$.pipe(
      filter((group) => !!group),
      switchMap((group) =>
        this.service.getStudents(group!._id).pipe(
          catchError((err) => {
            console.error(err);
            return of([]);
          }),
          tap((students) => this.setStudents(students))
        )
      )
    );
  });

  readonly fetchPeriods = this.effect(() => {
    return this.service.getPeriods().pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      }),
      tap((periods) => this.setPeriods(periods))
    );
  });

  readonly createGrade = this.effect((request$: Observable<Partial<Grade>>) => {
    return request$.pipe(
      withLatestFrom(
        this.selectedPeriod$,
        this.selectedCourse$,
        this.selectedGroup$
      ),
      switchMap(([request, period, course, group]) =>
        this.service.addGrade({ ...request, period, course, group }).pipe(
          catchError((err) => {
            console.error(err);
            return of();
          }),
          tap((payload) => this.addGrade(payload))
        )
      )
    );
  });

  readonly fetchGrades = this.effect(() => {
    return this.selectedCourse$.pipe(
      combineLatestWith(this.selectedGroup$, this.selectedPeriod$),
      filter(([course, group, period]) => !!course && !!group && !!period),
      switchMap(([course, group, period]) =>
        this.service
          .getGrades({
            course: course?._id,
            group: group?._id,
            period: period?._id,
          })
          .pipe(
            catchError((err) => {
              console.error(err);
              return of([]);
            }),
            tap((grades) => this.setGrades(grades))
          )
      )
    );
  });

  readonly patchGrade = this.effect(
    (request$: Observable<{ id: string; request: Partial<Grade> }>) => {
      return request$.pipe(
        switchMap(({ id, request }) =>
          this.service.patchGrade(id, request).pipe(
            catchError((err) => {
              console.error(err);
              return of();
            }),
            tap((payload) => this.updateGrade(payload))
          )
        )
      );
    }
  );
}

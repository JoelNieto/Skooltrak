/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ClassGroup, Course, Student } from '@skooltrak-app/models';
import { catchError, filter, of, switchMap, tap } from 'rxjs';
import { GradesService } from './grades.service';
interface State {
  courses: Course[];
  selectedCourse?: Course;
  groups: ClassGroup[];
  selectedGroup?: ClassGroup;
  students: Student[];
}

@Injectable()
export class GradesStore extends ComponentStore<State> {
  constructor(private service: GradesService) {
    super({ courses: [], groups: [], students: [] });
  }

  // SELECTORS
  readonly courses$ = this.select((state) => state.courses);
  readonly selectedCourse$ = this.select((state) => state.selectedCourse);
  readonly groups$ = this.select((state) => state.groups);
  readonly selectedGroup$ = this.select((state) => state.selectedGroup);
  readonly students$ = this.select((state) => state.students);

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
}

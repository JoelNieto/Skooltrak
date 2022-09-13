import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from '@skooltrak-app/models';

import { CoursesActions } from './courses.actions';
import * as CoursesSelectors from './courses.selectors';

@Injectable()
export class CoursesFacade {
  allCourses$ = this.store$.select(CoursesSelectors.selectAllCourses);
  selectedCourse$ = this.store$.select(CoursesSelectors.selectSelected);
  constructor(private readonly store$: Store) {}

  init() {
    this.store$.dispatch(CoursesActions.initCourses());
  }

  create(request: Course) {
    this.store$.dispatch(CoursesActions.createCourse({ request }));
  }

  edit(id: string, request: Partial<Course>) {
    this.store$.dispatch(CoursesActions.editCourse({ id, request }));
  }

  delete(id: string) {
    this.store$.dispatch(CoursesActions.deleteCourse({ id }));
  }

  setCourse(id: string | undefined) {
    this.store$.dispatch(CoursesActions.setCourse({ id }));
  }
}

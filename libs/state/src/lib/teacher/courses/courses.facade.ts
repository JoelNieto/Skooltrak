import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

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

  setCourse(id: string | undefined) {
    this.store$.dispatch(CoursesActions.setCourse({ id }));
  }
}

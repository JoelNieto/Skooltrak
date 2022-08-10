import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Student } from '@skooltrak-app/models';

import { ClassGroupsActions } from '../class-groups';
import { selectAllClassGroups } from '../class-groups/class-groups.selectors';
import { DegreesActions } from '../degrees';
import { selectAllDegrees } from '../degrees/degrees.selectors';
import { SchoolsActions, selectAllSchools } from '../schools';
import { PlansActions } from '../study-plans/study-plans.actions';
import { selectAllPlans } from '../study-plans/study-plans.selectors';
import { StudentsActions } from './students.actions';
import { selectAllStudents, selectSelected } from './students.selectors';

@Injectable({ providedIn: 'root' })
export class StudentsFacade {
  allStudents$ = this.store.select(selectAllStudents);
  selectedStudent$ = this.store.select(selectSelected);
  allGroups$ = this.store.select(selectAllClassGroups);
  allSchools$ = this.store.select(selectAllSchools);
  allDegrees$ = this.store.select(selectAllDegrees);
  allPlans$ = this.store.select(selectAllPlans);
  constructor(private store: Store) {}

  init() {
    this.store.dispatch(StudentsActions.loadStudents());
    this.store.dispatch(SchoolsActions.loadSchools());
    this.store.dispatch(DegreesActions.initDegrees());
    this.store.dispatch(ClassGroupsActions.initClassGroups());
    this.store.dispatch(PlansActions.initStudyPlans());
  }

  create(request: Partial<Student>) {
    this.store.dispatch(StudentsActions.createStudent({ request }));
  }

  setStudent(id: string | undefined) {
    this.store.dispatch(StudentsActions.setStudent({ id }));
  }
}

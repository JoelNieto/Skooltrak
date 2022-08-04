import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Teacher } from '@skooltrak-app/models';

import { PlansActions } from '../study-plans/study-plans.actions';
import { SubjectsActions } from '../subjects';
import { selectAllSubjects } from '../subjects/subjects.selectors';
import { TeachersActions } from './teachers.actions';
import * as TeachersSelectors from './teachers.selectors';

@Injectable()
export class TeachersFacade {
  allTeachers$ = this.store.select(TeachersSelectors.selectAllTeachers);
  subjects$ = this.store.select(selectAllSubjects);
  selectedTeacher$ = this.store.select(TeachersSelectors.selectSelected);
  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(PlansActions.initStudyPlans());
    this.store.dispatch(SubjectsActions.initSubjects());
    this.store.dispatch(TeachersActions.initTeachers());
  }

  create(request: Teacher) {
    this.store.dispatch(TeachersActions.createTeacher({ request }));
  }

  edit(id: string, request: Partial<Teacher>) {
    this.store.dispatch(TeachersActions.editTeacher({ id, request }));
  }

  delete(id: string) {
    this.store.dispatch(TeachersActions.deleteTeacher({ id }));
  }

  setTeacher(id: string | undefined) {
    this.store.dispatch(TeachersActions.setTeacher({ id }));
  }
}

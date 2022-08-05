import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClassGroup } from '@skooltrak-app/models';

import { PlansActions } from '../study-plans/study-plans.actions';
import { selectAllPlans } from '../study-plans/study-plans.selectors';
import { SubjectsActions } from '../subjects';
import { selectAllSubjects } from '../subjects/subjects.selectors';
import { TeachersActions } from '../teachers';
import { selectAllTeachers } from '../teachers/teachers.selectors';
import { ClassGroupsActions } from './class-groups.actions';
import * as ClassGroupsSelectors from './class-groups.selectors';

@Injectable()
export class ClassGroupsFacade {
  allClassGroups$ = this.store.select(
    ClassGroupsSelectors.selectAllClassGroups
  );
  subjects$ = this.store.select(selectAllSubjects);
  selectedClassGroup$ = this.store.select(ClassGroupsSelectors.selectSelected);
  teachers$ = this.store.select(selectAllTeachers);
  plans$ = this.store.select(selectAllPlans);
  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(PlansActions.initStudyPlans());
    this.store.dispatch(SubjectsActions.initSubjects());
    this.store.dispatch(TeachersActions.initTeachers());
    this.store.dispatch(ClassGroupsActions.initClassGroups());
  }

  create(request: ClassGroup) {
    this.store.dispatch(ClassGroupsActions.createClassGroup({ request }));
  }

  edit(id: string, request: Partial<ClassGroup>) {
    this.store.dispatch(ClassGroupsActions.editClassGroup({ id, request }));
  }

  delete(id: string) {
    this.store.dispatch(ClassGroupsActions.deleteClassGroup({ id }));
  }

  setClassGroup(id: string | undefined) {
    this.store.dispatch(ClassGroupsActions.setClassGroup({ id }));
  }
}

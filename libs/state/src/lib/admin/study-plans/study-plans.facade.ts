import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StudyPlan } from '@skooltrak-app/models';

import { DegreesActions } from '../degrees';
import { selectAllDegrees } from '../degrees/degrees.selectors';
import { SchoolsActions, selectAllSchools } from '../schools';
import { PlansActions } from './study-plans.actions';
import * as StudyPlansSelectors from './study-plans.selectors';

@Injectable()
export class StudyPlansFacade {
  allStudyPlans$ = this.store.select(StudyPlansSelectors.selectAllPlans);
  schools$ = this.store.select(selectAllSchools);
  degrees$ = this.store.select(selectAllDegrees);
  constructor(private readonly store: Store, private http: HttpClient) {}

  init() {
    this.store.dispatch(SchoolsActions.loadSchools());
    this.store.dispatch(DegreesActions.initDegrees());
    this.store.dispatch(PlansActions.initStudyPlans());
  }

  create(request: StudyPlan) {
    this.store.dispatch(PlansActions.createStudyPlan({ request }));
  }

  edit(id: string, request: Partial<StudyPlan>) {
    this.store.dispatch(PlansActions.editStudyPlan({ id, request }));
  }

  delete(id: string) {
    this.store.dispatch(PlansActions.deleteStudyPlan({ id }));
  }
}

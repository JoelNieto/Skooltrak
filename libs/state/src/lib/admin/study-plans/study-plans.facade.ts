import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StudyPlan } from '@skooltrak-app/models';

import { PlansActions } from './study-plans.actions';
import * as StudyPlansSelectors from './study-plans.selectors';

@Injectable()
export class StudyPlansFacade {
  allStudyPlans$ = this.store$.select(StudyPlansSelectors.selectAllPlans);
  constructor(private readonly store$: Store, private http: HttpClient) {}

  init() {
    this.store$.dispatch(PlansActions.initStudyPlans());
  }

  create(request: StudyPlan) {
    this.store$.dispatch(PlansActions.createStudyPlan({ request }));
  }

  edit(id: string, request: Partial<StudyPlan>) {
    this.store$.dispatch(PlansActions.editStudyPlan({ id, request }));
  }

  delete(id: string) {
    this.store$.dispatch(PlansActions.deleteStudyPlan({ id }));
  }
}

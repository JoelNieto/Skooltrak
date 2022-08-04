import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { StudyPlan } from '@skooltrak-app/models';

import { PlansActions } from './study-plans.actions';

export const studyPlansFeatureKey = 'study-plans';

export interface State extends EntityState<StudyPlan> {
  selectedId?: string | null;
  loaded: boolean;
  error?: unknown;
}

const selectId = (x: StudyPlan) => x._id;

export const studyPlansAdapter: EntityAdapter<StudyPlan> =
  createEntityAdapter<StudyPlan>({ selectId });

export const initialState: State = studyPlansAdapter.getInitialState({
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  on(PlansActions.loadStudyPlansSuccess, (state, { payload }) =>
    studyPlansAdapter.setAll(payload, { ...state, loaded: true })
  ),
  on(PlansActions.createStudyPlanSuccess, (state, { payload }) =>
    studyPlansAdapter.addOne(payload, state)
  ),
  on(PlansActions.editStudyPlanSuccess, (state, { id, changes }) =>
    studyPlansAdapter.updateOne({ id, changes }, state)
  ),
  on(PlansActions.deleteStudyPlanSuccess, (state, { id }) =>
    studyPlansAdapter.removeOne(id, state)
  )
);

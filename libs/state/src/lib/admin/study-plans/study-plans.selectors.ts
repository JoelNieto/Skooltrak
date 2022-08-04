import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStudyPlans from './study-plans.reducer';

export const selectPlansState = createFeatureSelector<fromStudyPlans.State>(
  fromStudyPlans.studyPlansFeatureKey
);

const { selectAll, selectEntities } =
  fromStudyPlans.studyPlansAdapter.getSelectors();

export const selectPlansLoaded = createSelector(
  selectPlansState,
  (state: fromStudyPlans.State) => state.loaded
);

export const selectPlansError = createSelector(
  selectPlansState,
  (state: fromStudyPlans.State) => state.error
);

export const selectAllPlans = createSelector(
  selectPlansState,
  (state: fromStudyPlans.State) => selectAll(state)
);

export const selectPlansEntities = createSelector(
  selectPlansState,
  (state: fromStudyPlans.State) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectPlansState,
  (state: fromStudyPlans.State) => state.selectedId
);

export const selectSelected = createSelector(
  selectPlansEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

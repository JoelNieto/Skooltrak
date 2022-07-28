import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSubjects from './subjects.reducer';

export const selectSubjectsState = createFeatureSelector<fromSubjects.State>(
  fromSubjects.subjectsFeatureKey
);

const { selectAll, selectEntities } =
  fromSubjects.subjectsAdapter.getSelectors();

export const selectSubjectsLoaded = createSelector(
  selectSubjectsState,
  (state: fromSubjects.State) => state.loaded
);

export const selectSubjectsError = createSelector(
  selectSubjectsState,
  (state: fromSubjects.State) => state.error
);

export const selectAllSubjects = createSelector(
  selectSubjectsState,
  (state: fromSubjects.State) => selectAll(state)
);

export const selectSubjectsEntities = createSelector(
  selectSubjectsState,
  (state: fromSubjects.State) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectSubjectsState,
  (state: fromSubjects.State) => state.selectedId
);

export const selectSelected = createSelector(
  selectSubjectsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

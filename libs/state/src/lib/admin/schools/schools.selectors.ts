import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSchools from './schools.reducer';

export const selectSchoolsState = createFeatureSelector<fromSchools.State>(
  fromSchools.schoolsFeatureKey
);

const { selectAll, selectEntities } = fromSchools.schoolsAdapter.getSelectors();

export const selectSchoolsLoaded = createSelector(
  selectSchoolsState,
  (state: fromSchools.State) => state.loaded
);

export const selectSchoolsError = createSelector(
  selectSchoolsState,
  (state: fromSchools.State) => state.error
);

export const selectAllSchools = createSelector(
  selectSchoolsState,
  (state: fromSchools.State) => selectAll(state)
);

export const selectSchoolsEntities = createSelector(
  selectSchoolsState,
  (state: fromSchools.State) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectSchoolsState,
  (state: fromSchools.State) => state.selectedId
);

export const selectSelected = createSelector(
  selectSchoolsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

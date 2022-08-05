import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromClassGroups from './class-groups.reducer';

export const selectClassGroupsState =
  createFeatureSelector<fromClassGroups.State>(
    fromClassGroups.classGroupsFeatureKey
  );

const { selectAll, selectEntities } =
  fromClassGroups.classGroupsAdapter.getSelectors();

export const selectClassGroupsLoaded = createSelector(
  selectClassGroupsState,
  (state: fromClassGroups.State) => state.loaded
);

export const selectClassGroupsError = createSelector(
  selectClassGroupsState,
  (state: fromClassGroups.State) => state.error
);

export const selectAllClassGroups = createSelector(
  selectClassGroupsState,
  (state: fromClassGroups.State) => selectAll(state)
);

export const selectClassGroupsEntities = createSelector(
  selectClassGroupsState,
  (state: fromClassGroups.State) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectClassGroupsState,
  (state: fromClassGroups.State) => state.selectedId
);

export const selectSelected = createSelector(
  selectClassGroupsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

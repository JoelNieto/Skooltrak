import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGroups from './groups.reducer';

export const selectGroupsState = createFeatureSelector<fromGroups.State>(
  fromGroups.groupsFeatureKey
);

const { selectAll, selectEntities } = fromGroups.groupsAdapter.getSelectors();

export const selectGroupsLoaded = createSelector(
  selectGroupsState,
  (state: fromGroups.State) => state.loaded
);

export const selectGroupsError = createSelector(
  selectGroupsState,
  (state) => state.error
);

export const selectAllGroups = createSelector(
  selectGroupsState,
  (state: fromGroups.State) => selectAll(state)
);
export const selectGroupsEntities = createSelector(
  selectGroupsState,
  (state: fromGroups.State) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectGroupsState,
  (state: fromGroups.State) => state.selectedId
);

export const selectSelected = createSelector(
  selectGroupsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAssignmentTypes from './assignment-types.reducer';

export const selectAssignmentTypesState =
  createFeatureSelector<fromAssignmentTypes.State>(
    fromAssignmentTypes.assignmentTypesFeatureKey
  );

const { selectAll, selectEntities } =
  fromAssignmentTypes.assignmentTypesAdapter.getSelectors();

export const selectAssignmentTypesLoaded = createSelector(
  selectAssignmentTypesState,
  (state: fromAssignmentTypes.State) => state.loaded
);

export const selectAssignmentTypesError = createSelector(
  selectAssignmentTypesState,
  (state: fromAssignmentTypes.State) => state.error
);

export const selectAllAssignmentTypes = createSelector(
  selectAssignmentTypesState,
  (state: fromAssignmentTypes.State) => selectAll(state)
);

export const selectAssignmentTypesEntities = createSelector(
  selectAssignmentTypesState,
  (state: fromAssignmentTypes.State) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectAssignmentTypesState,
  (state: fromAssignmentTypes.State) => state.selectedId
);

export const selectSelected = createSelector(
  selectAssignmentTypesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

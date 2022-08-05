import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromDegrees from './degrees.reducer';

export const selectDegreesState = createFeatureSelector<fromDegrees.State>(
  fromDegrees.degreesFeatureKey
);

const { selectAll, selectEntities } = fromDegrees.degreesAdapter.getSelectors();

export const selectDegreesLoaded = createSelector(
  selectDegreesState,
  (state: fromDegrees.State) => state.loaded
);

export const selectDegreesError = createSelector(
  selectDegreesState,
  (state: fromDegrees.State) => state.error
);

export const selectAllDegrees = createSelector(
  selectDegreesState,
  (state: fromDegrees.State) => selectAll(state)
);

export const selectDegreesEntities = createSelector(
  selectDegreesState,
  (state: fromDegrees.State) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectDegreesState,
  (state: fromDegrees.State) => state.selectedId
);

export const selectSelected = createSelector(
  selectDegreesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTeachers from './teachers.reducer';

export const selectTeachersState = createFeatureSelector<fromTeachers.State>(
  fromTeachers.teachersFeatureKey
);

const { selectAll, selectEntities } =
  fromTeachers.teachersAdapter.getSelectors();

export const selectTeachersLoaded = createSelector(
  selectTeachersState,
  (state: fromTeachers.State) => state.loaded
);

export const selectTeachersError = createSelector(
  selectTeachersState,
  (state: fromTeachers.State) => state.error
);

export const selectAllTeachers = createSelector(
  selectTeachersState,
  (state: fromTeachers.State) => selectAll(state)
);

export const selectTeachersEntities = createSelector(
  selectTeachersState,
  (state: fromTeachers.State) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectTeachersState,
  (state: fromTeachers.State) => state.selectedId
);

export const selectSelected = createSelector(
  selectTeachersEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStudents from './students.reducer';

export const selectStudentsState = createFeatureSelector<fromStudents.State>(
  fromStudents.studentsFeatureKey
);

const { selectAll, selectEntities } =
  fromStudents.studentsAdapter.getSelectors();

export const selectStudentsLoaded = createSelector(
  selectStudentsState,
  (state: fromStudents.State) => state.loaded
);

export const selectStudentsError = createSelector(
  selectStudentsState,
  (state: fromStudents.State) => state.error
);
export const selectStudentsSaving = createSelector(
  selectStudentsState,
  (state: fromStudents.State) => state.saving
);

export const selectAllStudents = createSelector(
  selectStudentsState,
  (state: fromStudents.State) => selectAll(state)
);

export const selectStudentsEntities = createSelector(
  selectStudentsState,
  (state: fromStudents.State) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectStudentsState,
  (state: fromStudents.State) => state.selectedId
);

export const selectSelected = createSelector(
  selectStudentsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

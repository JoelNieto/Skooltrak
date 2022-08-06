import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCourses from './courses.reducer';

export const selectCoursesState = createFeatureSelector<fromCourses.State>(
  fromCourses.coursesFeatureKey
);

const { selectAll, selectEntities } = fromCourses.coursesAdapter.getSelectors();

export const selectCoursesLoaded = createSelector(
  selectCoursesState,
  (state: fromCourses.State) => state.loaded
);

export const selectCoursesError = createSelector(
  selectCoursesState,
  (state: fromCourses.State) => state.error
);

export const selectAllCourses = createSelector(
  selectCoursesState,
  (state: fromCourses.State) => selectAll(state)
);

export const selectCoursesEntities = createSelector(
  selectCoursesState,
  (state: fromCourses.State) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectCoursesState,
  (state: fromCourses.State) => state.selectedId
);

export const selectSelected = createSelector(
  selectCoursesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

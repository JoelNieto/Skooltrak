import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Course } from '@skooltrak-app/models';

import { CoursesActions } from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface State extends EntityState<Course> {
  selectedId?: string | null;
  loaded: boolean;
  error?: unknown;
}

const selectId = (x: Course) => x._id;

export const coursesAdapter: EntityAdapter<Course> =
  createEntityAdapter<Course>({ selectId });

export const initialState: State = coursesAdapter.getInitialState({
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  on(CoursesActions.loadCoursesSuccess, (state, { payload }) =>
    coursesAdapter.setAll(payload, { ...state, loaded: true })
  ),
  on(
    CoursesActions.setCourse,
    (state, { id }): State => ({
      ...state,
      selectedId: id,
    })
  )
);

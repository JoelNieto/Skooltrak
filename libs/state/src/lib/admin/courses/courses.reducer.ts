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
  on(CoursesActions.createCourseSuccess, (state, { payload }) =>
    coursesAdapter.addOne(payload, state)
  ),
  on(CoursesActions.setCourse, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(CoursesActions.editCourseSuccess, (state, { id, changes }) =>
    coursesAdapter.updateOne({ id, changes }, state)
  ),
  on(CoursesActions.deleteCourseSuccess, (state, { id }) =>
    coursesAdapter.removeOne(id, state)
  )
);

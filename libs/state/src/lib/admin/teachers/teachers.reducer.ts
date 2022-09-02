import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Teacher } from '@skooltrak-app/models';

import { TeachersActions } from './teachers.actions';

export const teachersFeatureKey = 'teachers';

export interface State extends EntityState<Teacher> {
  selectedId?: string | null;
  loaded: boolean;
  error?: unknown;
}

const selectId = (x: Teacher) => x._id;

export const teachersAdapter: EntityAdapter<Teacher> =
  createEntityAdapter<Teacher>({ selectId });

export const initialState: State = teachersAdapter.getInitialState({
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  on(TeachersActions.loadTeachersSuccess, (state, { payload }) =>
    teachersAdapter.setAll(payload, { ...state, loaded: true })
  ),
  on(TeachersActions.createTeacherSuccess, (state, { payload }) =>
    teachersAdapter.addOne(payload, state)
  ),
  on(
    TeachersActions.setTeacher,
    (state, { id }): State => ({
      ...state,
      selectedId: id,
    })
  ),
  on(TeachersActions.editTeacherSuccess, (state, { id, changes }) =>
    teachersAdapter.updateOne({ id, changes }, state)
  ),
  on(TeachersActions.deleteTeacherSuccess, (state, { id }) =>
    teachersAdapter.removeOne(id, state)
  )
);

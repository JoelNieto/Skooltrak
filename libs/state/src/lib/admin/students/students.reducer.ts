import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Student } from '@skooltrak-app/models';

import { StudentsActions } from './students.actions';

export const studentsFeatureKey = 'students';

export interface State extends EntityState<Student> {
  selectedId?: string;
  loaded: boolean;
  error?: unknown;
  saving: boolean;
  pictureChanged?: boolean;
}

const selectId = (x: Student) => x._id;

export const studentsAdapter: EntityAdapter<Student> =
  createEntityAdapter<Student>({ selectId });

export const initialState: State = studentsAdapter.getInitialState({
  loaded: false,
  saving: false,
});

export const reducer = createReducer(
  initialState,
  on(StudentsActions.loadStudentsSuccess, (state, { payload }) =>
    studentsAdapter.setAll(payload, state)
  ),
  on(
    StudentsActions.updateStudent,
    (state): State => ({ ...state, saving: true })
  ),
  on(
    StudentsActions.createStudent,
    (state): State => ({ ...state, saving: true })
  ),
  on(
    StudentsActions.updateStudentSuccess,
    (state): State => ({ ...state, saving: false })
  ),
  on(
    StudentsActions.createStudentSuccess,
    (state): State => ({ ...state, saving: false })
  ),
  on(
    StudentsActions.createStudentFailure,
    (state): State => ({ ...state, saving: false })
  ),
  on(StudentsActions.updateStudentSuccess, (state, { id, changes }) =>
    studentsAdapter.updateOne({ id, changes }, state)
  ),
  on(StudentsActions.createStudentSuccess, (state, { payload }) =>
    studentsAdapter.addOne(payload, state)
  ),
  on(
    StudentsActions.setStudent,
    (state, { id }): State => ({
      ...state,
      selectedId: id,
    })
  ),
  on(
    StudentsActions.pictureChanged,
    (state, { changed }): State => ({
      ...state,
      pictureChanged: changed,
    })
  )
);

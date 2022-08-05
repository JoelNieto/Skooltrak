import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Student } from '@skooltrak-app/models';

import { StudentsActions } from './students.actions';

export const studentsFeatureKey = 'students';

export interface State extends EntityState<Student> {
  selectedId?: string;
  loaded: boolean;
  error?: unknown;
}

const selectId = (x: Student) => x._id;

export const studentsAdapter: EntityAdapter<Student> =
  createEntityAdapter<Student>({ selectId });

export const initialState: State = studentsAdapter.getInitialState({
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  on(StudentsActions.loadStudentsSuccess, (state, { payload }) =>
    studentsAdapter.setAll(payload, state)
  ),
  on(StudentsActions.updateStudentSuccess, (state, { id, changes }) =>
    studentsAdapter.updateOne({ id, changes }, state)
  ),
  on(StudentsActions.createStudentSuccess, (state, { payload }) =>
    studentsAdapter.addOne(payload, state)
  )
);

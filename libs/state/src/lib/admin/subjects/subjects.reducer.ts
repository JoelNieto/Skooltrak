import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Subject } from '@skooltrak-app/models';

import { SubjectsActions } from './subjects.actions';

export const subjectsFeatureKey = 'subjects';

export interface State extends EntityState<Subject> {
  selectedId?: string | null;
  loaded: boolean;
  error?: unknown;
}

const selectId = (x: Subject) => x._id;

export const subjectsAdapter: EntityAdapter<Subject> =
  createEntityAdapter<Subject>({ selectId });

export const initialState: State = subjectsAdapter.getInitialState({
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  on(SubjectsActions.loadSubjectsSuccess, (state, { payload }) =>
    subjectsAdapter.setAll(payload, { ...state, loaded: true })
  ),
  on(SubjectsActions.createSubjectSuccess, (state, { payload }) =>
    subjectsAdapter.addOne(payload, state)
  ),
  on(SubjectsActions.editSubjectSuccess, (state, { id, changes }) =>
    subjectsAdapter.updateOne({ id, changes }, state)
  ),
  on(SubjectsActions.deleteSubjectSuccess, (state, { id }) =>
    subjectsAdapter.removeOne(id, state)
  )
);

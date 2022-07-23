import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { School } from '@skooltrak-app/models';

import { SchoolsActions } from './schools.actions';

export const schoolsFeatureKey = 'schools';

export interface State extends EntityState<School> {
  selectedId?: string | null;
  loaded: boolean;
  error?: unknown;
}

const selectId = (x: School) => x._id;

export const schoolsAdapter: EntityAdapter<School> =
  createEntityAdapter<School>({ selectId });

export const initialState: State = schoolsAdapter.getInitialState({
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  on(
    SchoolsActions.loadSchoolSuccess,
    (state, { payload }): State => schoolsAdapter.setAll(payload, state)
  ),
  on(
    SchoolsActions.createSchoolSuccess,
    (state, { payload }): State => schoolsAdapter.addOne(payload, state)
  ),
  on(
    SchoolsActions.updateSchoolSuccess,
    (state, { id, changes }): State =>
      schoolsAdapter.updateOne({ id, changes }, state)
  ),
  on(
    SchoolsActions.setSchool,
    (state, { id }): State => ({
      ...state,
      selectedId: id,
    })
  )
);

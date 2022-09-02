import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { AssignmentType } from '@skooltrak-app/models';

import { AssignmentTypesActions } from './assignment-types.actions';

export const assignmentTypesFeatureKey = 'assignmentTypes';

export interface State extends EntityState<AssignmentType> {
  selectedId?: string | null;
  loaded: boolean;
  error?: unknown;
}

const selectId = (x: AssignmentType) => x._id;

export const assignmentTypesAdapter: EntityAdapter<AssignmentType> =
  createEntityAdapter<AssignmentType>({ selectId });

export const initialState: State = assignmentTypesAdapter.getInitialState({
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  on(AssignmentTypesActions.loadAssignmentTypesSuccess, (state, { payload }) =>
    assignmentTypesAdapter.setAll(payload, { ...state, loaded: true })
  ),
  on(AssignmentTypesActions.createAssignmentTypeSuccess, (state, { payload }) =>
    assignmentTypesAdapter.addOne(payload, state)
  ),
  on(
    AssignmentTypesActions.setAssignmentType,
    (state, { id }): State => ({
      ...state,
      selectedId: id,
    })
  ),
  on(
    AssignmentTypesActions.editAssignmentTypeSuccess,
    (state, { id, changes }) =>
      assignmentTypesAdapter.updateOne({ id, changes }, state)
  ),
  on(AssignmentTypesActions.deleteAssignmentTypeSuccess, (state, { id }) =>
    assignmentTypesAdapter.removeOne(id, state)
  )
);

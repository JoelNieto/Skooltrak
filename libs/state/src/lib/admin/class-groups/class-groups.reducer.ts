import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ClassGroup } from '@skooltrak-app/models';

import { ClassGroupsActions } from './class-groups.actions';

export const classGroupsFeatureKey = 'classGroups';

export interface State extends EntityState<ClassGroup> {
  selectedId?: string | null;
  loaded: boolean;
  error?: unknown;
}

const selectId = (x: ClassGroup) => x._id;

export const classGroupsAdapter: EntityAdapter<ClassGroup> =
  createEntityAdapter<ClassGroup>({ selectId });

export const initialState: State = classGroupsAdapter.getInitialState({
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  on(ClassGroupsActions.loadClassGroupsSuccess, (state, { payload }) =>
    classGroupsAdapter.setAll(payload, { ...state, loaded: true })
  ),
  on(ClassGroupsActions.createClassGroupSuccess, (state, { payload }) =>
    classGroupsAdapter.addOne(payload, state)
  ),
  on(
    ClassGroupsActions.setClassGroup,
    (state, { id }): State => ({
      ...state,
      selectedId: id,
    })
  ),
  on(ClassGroupsActions.editClassGroupSuccess, (state, { id, changes }) =>
    classGroupsAdapter.updateOne({ id, changes }, state)
  ),
  on(ClassGroupsActions.deleteClassGroupSuccess, (state, { id }) =>
    classGroupsAdapter.removeOne(id, state)
  )
);

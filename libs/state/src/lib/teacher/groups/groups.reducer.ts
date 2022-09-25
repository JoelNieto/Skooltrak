import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ClassGroup } from '@skooltrak-app/models';

import { GroupsActions } from './groups.actions';

export const groupsFeatureKey = 'groups';
export interface State extends EntityState<ClassGroup> {
  selectedId?: string | null;
  loaded: boolean;
  error?: unknown;
}

const selectId = (x: ClassGroup) => x._id;

export const groupsAdapter: EntityAdapter<ClassGroup> = createEntityAdapter({
  selectId,
});

export const initialState: State = groupsAdapter.getInitialState({
  loaded: false,
});

export const reducer = createReducer(
  initialState,
  on(GroupsActions.loadGroupsSuccess, (state, { payload }) =>
    groupsAdapter.setAll(payload, state)
  ),
  on(
    GroupsActions.setGroup,
    (state, { id }): State => ({ ...state, selectedId: id })
  )
);

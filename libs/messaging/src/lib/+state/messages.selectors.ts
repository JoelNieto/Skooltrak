import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromMessages from './messages.reducer';

export const selectMessagesState = createFeatureSelector<fromMessages.State>(
  fromMessages.messagesFeatureKey
);

const { selectAll, selectEntities } =
  fromMessages.messagesAdapter.getSelectors();

export const selectAllMessages = createSelector(
  selectMessagesState,
  (state: fromMessages.State) => selectAll(state)
);

export const selectPageIndex = createSelector(
  selectMessagesState,
  (state: fromMessages.State) => state.pageIndex
);

export const selectSelectedId = createSelector(
  selectMessagesState,
  (state: fromMessages.State) => state.selectedId
);

export const selectCount = createSelector(
  selectMessagesState,
  (state) => state.count
);

export const selectPageSize = createSelector(
  selectMessagesState,
  (state) => state.pageSize
);

export const selectMessagesEntities = createSelector(
  selectMessagesState,
  (state) => selectEntities(state)
);

export const selectSelectedMessage = createSelector(
  selectMessagesEntities,
  selectSelectedId,
  (entities, id) => (id ? entities[id] : undefined)
);

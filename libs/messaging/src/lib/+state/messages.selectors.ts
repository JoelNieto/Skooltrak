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

export const selectedId = createSelector(
  selectMessagesState,
  (state: fromMessages.State) => state.selectedId
);

export const selectCount = createSelector(
  selectMessagesState,
  (state) => state.count
);

export const selectMessagesEntities = createSelector(
  selectMessagesState,
  (state) => selectEntities(state)
);

export const selectedMessage = createSelector(
  selectMessagesEntities,
  selectedId,
  (entities, id) => (id ? entities[id] : undefined)
);

import { Action, createReducer, on } from '@ngrx/store';
import { Inbox } from '@skooltrak-app/models';
import { MessagesActions } from './messages.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const messagesFeatureKey = 'messages';

export interface State extends EntityState<Inbox> {
  selectedId?: string;
  loaded: boolean;
  pageIndex: number;
  error?: unknown | null;
  count?: number | null;
}

const selectId = (x: Inbox) => x._id;

export const messagesAdapter: EntityAdapter<Inbox> = createEntityAdapter<Inbox>(
  { selectId }
);

export const initialState: State = messagesAdapter.getInitialState({
  loaded: false,
  pageIndex: 1,
});
export const reducer = createReducer(
  initialState,

  on(MessagesActions.loadInboxSuccess, (state, { payload }) =>
    messagesAdapter.setAll(payload.items, {
      ...state,
      loaded: true,
      pageIndex: payload.pageIndex,
      count: payload.count,
    })
  ),
  on(MessagesActions.loadInboxFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

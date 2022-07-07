import { createReducer, on } from '@ngrx/store';
import { Inbox, Message } from '@skooltrak-app/models';
import { PaginatedData } from 'libs/models/src/lib/base';

import * as MessagingActions from './messaging.actions';

export const messagingFeatureKey = 'messaging';

export interface State {
  inbox: PaginatedData<Inbox> | undefined;
  sent: PaginatedData<Message> | undefined;
  selectedMessage: Message | undefined;
  loaded: boolean;
  error: string | null;
}

export const initialState: State = {
  inbox: undefined,
  sent: undefined,
  selectedMessage: undefined,
  loaded: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(MessagingActions.loadMessagings, (state) => state)
);

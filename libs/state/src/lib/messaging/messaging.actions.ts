import { createAction, createActionGroup, emptyProps } from '@ngrx/store';

export const loadMessagings = createAction('[Messaging] Load Messagings');

export const MessagingActions = createActionGroup({
  source: 'Messages',
  events: {
    'Init Inbox': emptyProps(),
  },
});

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inbox, Message, PaginatedData } from '@skooltrak-app/models';

export const MessagesActions = createActionGroup({
  source: 'Messages/API',
  events: {
    'Load Inbox': emptyProps(),
    'Load Inbox Success': props<{ payload: PaginatedData<Inbox> }>(),
    'Load Inbox Failure': props<{ error: unknown }>(),
    'Send Message': props<{ request: Partial<Message> }>(),
    'Send Message Success': props<{ payload: Message }>(),
  },
});

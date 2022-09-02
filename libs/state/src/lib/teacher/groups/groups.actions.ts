import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ClassGroup } from '@skooltrak-app/models';

export const GroupsActions = createActionGroup({
  source: 'Teacher / Groups',
  events: {
    'Init Groups': emptyProps(),
    'Load Groups Success': props<{ payload: ClassGroup[] }>(),
    'Load Groups Failure': props<{ error: unknown }>(),
    'Set Group': props<{ id: string | undefined }>(),
  },
});

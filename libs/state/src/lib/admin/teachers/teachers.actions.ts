import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Teacher } from '@skooltrak-app/models';

export const TeachersActions = createActionGroup({
  source: 'Teachers',
  events: {
    'Init Teachers': emptyProps(),
    'Load Teachers Success': props<{ payload: Teacher[] }>(),
    'Load Teachers Failure': props<{ error: unknown }>(),
    'Create Teacher': props<{ request: Teacher }>(),
    'Create Teacher Success': props<{ payload: Teacher }>(),
    'Create Teacher Failure': props<{ error: unknown }>(),
    'Set Teacher': props<{ id: string | undefined }>(),
    'Edit Teacher': props<{ id: string; request: Partial<Teacher> }>(),
    'Edit Teacher Success': props<{ id: string; changes: Teacher }>(),
    'Edit Teacher Failure': props<{ error: unknown }>(),
    'Delete Teacher': props<{ id: string }>(),
    'Delete Teacher Success': props<{ id: string }>(),
    'Delete Teacher Failure': props<{ error: unknown }>(),
  },
});

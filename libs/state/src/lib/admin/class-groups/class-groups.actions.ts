import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ClassGroup } from '@skooltrak-app/models';

export const ClassGroupsActions = createActionGroup({
  source: 'Class Groups',
  events: {
    'Init Class Groups': emptyProps(),
    'Load Class Groups Success': props<{ payload: ClassGroup[] }>(),
    'Load Class Groups Failure': props<{ error: unknown }>(),
    'Create Class Group': props<{ request: ClassGroup }>(),
    'Create Class Group Success': props<{ payload: ClassGroup }>(),
    'Create Class Group Failure': props<{ error: unknown }>(),
    'Set Class Group': props<{ id: string | undefined }>(),
    'Edit Class Group': props<{ id: string; request: Partial<ClassGroup> }>(),
    'Edit Class Group Success': props<{ id: string; changes: ClassGroup }>(),
    'Edit Class Group Failure': props<{ error: unknown }>(),
    'Delete Class Group': props<{ id: string }>(),
    'Delete Class Group Success': props<{ id: string }>(),
    'Delete Class Group Failure': props<{ error: unknown }>(),
  },
});

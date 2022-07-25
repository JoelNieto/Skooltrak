import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Degree } from '@skooltrak-app/models';

export const DegreesActions = createActionGroup({
  source: 'Degrees',
  events: {
    'Init Degrees': emptyProps(),
    'Load Degrees Success': props<{ payload: Degree[] }>(),
    'Load Degrees Failure': props<{ error: unknown }>(),
    'Create Degree': props<{ request: Degree }>(),
    'Create Degree Success': props<{ payload: Degree }>(),
    'Create Degree Failure': props<{ error: unknown }>(),
    'Edit Degree': props<{ id: string; request: Partial<Degree> }>(),
    'Edit Degree Success': props<{ id: string; changes: Degree }>(),
    'Edit Degree Failure': props<{ error: unknown }>(),
  },
});

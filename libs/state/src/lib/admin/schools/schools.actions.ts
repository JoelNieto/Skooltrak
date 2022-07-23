import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { School } from '@skooltrak-app/models';

export const SchoolsActions = createActionGroup({
  source: 'Schools',
  events: {
    'Load Schools': emptyProps(),
    'Load School Success': props<{ payload: School[] }>(),
    'Load School Failure': props<{ error: unknown }>(),
    'Create School': props<{ request: School }>(),
    'Create School Success': props<{ payload: School }>(),
    'Create School Failure': props<{ error: unknown }>(),
    'Set School': props<{ id: string | null | undefined }>(),
    'Update School': props<{ id: string; request: Partial<School> }>(),
    'Update School Success': props<{ id: string; changes: School }>(),
  },
});

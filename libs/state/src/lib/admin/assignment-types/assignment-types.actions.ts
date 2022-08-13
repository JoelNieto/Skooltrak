import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AssignmentType } from '@skooltrak-app/models';

export const AssignmentTypesActions = createActionGroup({
  source: 'Assignment Types',
  events: {
    'Init Assignment Types': emptyProps(),
    'Load Assignment Types Success': props<{ payload: AssignmentType[] }>(),
    'Load Assignment Types Failure': props<{ error: unknown }>(),
    'Create Assignment Type': props<{ request: Partial<AssignmentType> }>(),
    'Create Assignment Type Success': props<{ payload: AssignmentType }>(),
    'Create Assignment Type Failure': props<{ error: unknown }>(),
    'Set Assignment Type': props<{ id: string | undefined }>(),
    'Edit Assignment Type': props<{
      id: string;
      request: Partial<AssignmentType>;
    }>(),
    'Edit Assignment Type Success': props<{
      id: string;
      changes: AssignmentType;
    }>(),
    'Edit Assignment Type Failure': props<{ error: unknown }>(),
    'Delete Assignment Type': props<{ id: string }>(),
    'Delete Assignment Type Success': props<{ id: string }>(),
    'Delete Assignment Type Failure': props<{ error: unknown }>(),
  },
});

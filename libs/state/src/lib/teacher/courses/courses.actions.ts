import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '@skooltrak-app/models';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Init Courses': emptyProps(),
    'Load Courses Success': props<{ payload: Course[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),
    'Set Course': props<{ id: string | undefined }>(),
  },
});

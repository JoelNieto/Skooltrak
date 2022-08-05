import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '@skooltrak-app/models';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Init Courses': emptyProps(),
    'Load Courses Success': props<{ payload: Course[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),
    'Create Course': props<{ request: Course }>(),
    'Create Course Success': props<{ payload: Course }>(),
    'Create Course Failure': props<{ error: unknown }>(),
    'Set Course': props<{ id: string | undefined }>(),
    'Edit Course': props<{ id: string; request: Partial<Course> }>(),
    'Edit Course Success': props<{ id: string; changes: Course }>(),
    'Edit Course Failure': props<{ error: unknown }>(),
    'Delete Course': props<{ id: string }>(),
    'Delete Course Success': props<{ id: string }>(),
    'Delete Course Failure': props<{ error: unknown }>(),
  },
});

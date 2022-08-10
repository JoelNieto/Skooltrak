import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '@skooltrak-app/models';

export const StudentsActions = createActionGroup({
  source: 'Students/API',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ payload: Student[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),
    'Set Student': props<{ id: string | undefined }>(),
    'Create Student': props<{ request: Partial<Student> }>(),
    'Create Student Success': props<{ payload: Student }>(),
    'Create Student Failure': props<{ error: any }>(),
    'Update Student': props<{ id: string; request: Partial<Student> }>(),
    'Update Student Success': props<{ id: string; changes: Student }>(),
  },
});

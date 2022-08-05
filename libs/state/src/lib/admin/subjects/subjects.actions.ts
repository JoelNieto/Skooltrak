import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Subject } from '@skooltrak-app/models';

export const SubjectsActions = createActionGroup({
  source: 'Subjects',
  events: {
    'Init Subjects': emptyProps(),
    'Load Subjects Success': props<{ payload: Subject[] }>(),
    'Load Subjects Failure': props<{ error: unknown }>(),
    'Create Subject': props<{ request: Subject }>(),
    'Create Subject Success': props<{ payload: Subject }>(),
    'Create Subject Failure': props<{ error: unknown }>(),
    'Edit Subject': props<{ id: string; request: Partial<Subject> }>(),
    'Edit Subject Success': props<{ id: string; changes: Subject }>(),
    'Edit Subject Failure': props<{ error: unknown }>(),
    'Delete Subject': props<{ id: string }>(),
    'Delete Subject Success': props<{ id: string }>(),
    'Delete Subject Failure': props<{ error: unknown }>(),
  },
});

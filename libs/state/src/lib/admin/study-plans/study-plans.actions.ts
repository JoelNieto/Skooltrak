import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StudyPlan } from '@skooltrak-app/models';

export const PlansActions = createActionGroup({
  source: 'Study Plans',
  events: {
    'Init Study Plans': emptyProps(),
    'Load Study Plans Success': props<{ payload: StudyPlan[] }>(),
    'Load Study Plans Failure': props<{ error: unknown }>(),
    'Create Study Plan': props<{ request: StudyPlan }>(),
    'Create Study Plan Success': props<{ payload: StudyPlan }>(),
    'Create Study Plan Failure': props<{ error: unknown }>(),
    'Edit Study Plan': props<{ id: string; request: Partial<StudyPlan> }>(),
    'Edit Study Plan Success': props<{ id: string; changes: StudyPlan }>(),
    'Edit Study Plan Failure': props<{ error: unknown }>(),
    'Delete Study Plan': props<{ id: string }>(),
    'Delete Study Plan Success': props<{ id: string }>(),
    'Delete Study Plan Failure': props<{ error: unknown }>(),
  },
});

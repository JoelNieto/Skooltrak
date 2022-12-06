import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { teacher_courses, teacher_groups } from '@skooltrak-app/state';

export const COURSES_STATE = [
  teacher_courses.CoursesService,
  provideState(teacher_courses.coursesFeatureKey, teacher_courses.reducer),
  provideEffects(teacher_courses.CoursesEffects),
];

export const GROUPS_STATE = [
  teacher_groups.GroupsService,
  provideState(teacher_groups.groupsFeatureKey, teacher_groups.reducer),
  provideEffects(teacher_groups.GroupsEffects),
];

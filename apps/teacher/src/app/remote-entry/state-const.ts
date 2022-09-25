import { importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { teacher_courses, teacher_groups } from '@skooltrak-app/state';

export const COURSES_STATE = [
  teacher_courses.CoursesService,
  importProvidersFrom(
    StoreModule.forFeature(
      teacher_courses.coursesFeatureKey,
      teacher_courses.reducer
    ),
    EffectsModule.forFeature([teacher_courses.CoursesEffects])
  ),
];

export const GROUPS_STATE = [
  teacher_groups.GroupsService,
  importProvidersFrom(
    StoreModule.forFeature(
      teacher_groups.groupsFeatureKey,
      teacher_groups.reducer
    ),
    EffectsModule.forFeature([teacher_groups.GroupsEffects])
  ),
];

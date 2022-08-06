import { importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { teacher_courses } from '@skooltrak-app/state';

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

import { importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { class_groups, courses, schools, teachers } from '@skooltrak-app/state';

export const SCHOOLS_STATE = [
  schools.SchoolsService,
  importProvidersFrom(
    StoreModule.forFeature(schools.schoolsFeatureKey, schools.reducer),
    EffectsModule.forFeature([schools.SchoolsEffects])
  ),
];

export const COURSES_STATE = [
  courses.CoursesService,
  importProvidersFrom(
    StoreModule.forFeature(courses.coursesFeatureKey, courses.reducer),
    EffectsModule.forFeature([courses.CoursesEffects])
  ),
];
export const TEACHERS_STATE = [
  teachers.TeachersService,
  importProvidersFrom(
    StoreModule.forFeature(teachers.teachersFeatureKey, teachers.reducer),
    EffectsModule.forFeature([teachers.TeachersEffects])
  ),
];

export const CLASS_GROUPS_STATE = [
  class_groups.ClassGroupsService,
  importProvidersFrom(
    StoreModule.forFeature(
      class_groups.classGroupsFeatureKey,
      class_groups.reducer
    ),
    EffectsModule.forFeature([class_groups.ClassGroupsEffects])
  ),
];

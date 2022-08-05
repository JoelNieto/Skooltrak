import { importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { class_groups, courses, degrees, plans, schools, subjects, teachers } from '@skooltrak-app/state';

export const PLANS_STATE = [
  plans.StudyPlansService,
  importProvidersFrom(
    StoreModule.forFeature(plans.studyPlansFeatureKey, plans.reducer),
    EffectsModule.forFeature([plans.StudyPlansEffects])
  ),
];

export const DEGREES_STATE = [
  degrees.DegreesService,
  importProvidersFrom(
    StoreModule.forFeature(degrees.degreesFeatureKey, degrees.reducer),
    EffectsModule.forFeature([degrees.DegreesEffects])
  ),
];
export const SCHOOLS_STATE = [
  schools.SchoolsService,
  importProvidersFrom(
    StoreModule.forFeature(schools.schoolsFeatureKey, schools.reducer),
    EffectsModule.forFeature([schools.SchoolsEffects])
  ),
];

export const SUBJECTS_STATE = [
  subjects.SubjectsService,
  importProvidersFrom(
    StoreModule.forFeature(subjects.subjectsFeatureKey, subjects.reducer),
    EffectsModule.forFeature([subjects.SubjectsEffects])
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

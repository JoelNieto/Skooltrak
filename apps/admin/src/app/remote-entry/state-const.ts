import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { schools } from '@skooltrak-app/state';

export const SCHOOLS_STATE = [
  schools.SchoolsService,
  provideState(schools.schoolsFeatureKey, schools.reducer),
  provideEffects(schools.SchoolsEffects),
];

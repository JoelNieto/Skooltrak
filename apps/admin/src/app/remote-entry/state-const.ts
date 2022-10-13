import { importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { schools } from '@skooltrak-app/state';

export const SCHOOLS_STATE = [
  schools.SchoolsService,
  importProvidersFrom(
    StoreModule.forFeature(schools.schoolsFeatureKey, schools.reducer),
    EffectsModule.forFeature([schools.SchoolsEffects])
  ),
];

import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { admin } from '@skooltrak-app/state';

import { StudentsComponent } from './students.component';

export const STUDENTS_ROUTES: Routes = [
  {
    path: '',
    providers: [
      admin.students.StudentsFacade,
      importProvidersFrom(
        StoreModule.forFeature(
          admin.students.studentsFeatureKey,
          admin.students.reducer
        ),
        EffectsModule.forFeature([admin.students.StudentsEffects])
      ),
    ],
    children: [{ path: '', component: StudentsComponent }],
  },
];

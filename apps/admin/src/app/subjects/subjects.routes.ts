import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { subjects as state } from '@skooltrak-app/state';

import { SubjectsComponent } from './subjects.component';

export const SUBJECTS_ROUTES: Routes = [
  {
    path: '',
    providers: [
      state.SubjectsService,
      state.SubjectsFacade,
      importProvidersFrom(
        StoreModule.forFeature(state.subjectsFeatureKey, state.reducer),
        EffectsModule.forFeature([state.SubjectsEffects])
      ),
    ],
    children: [
      {
        path: '',
        component: SubjectsComponent,
        pathMatch: 'full',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./subjects-list/subjects-list.component').then(
                (c) => c.SubjectsListComponent
              ),
          },
        ],
      },
    ],
  },
];

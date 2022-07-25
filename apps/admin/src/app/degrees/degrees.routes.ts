import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { degrees as state } from '@skooltrak-app/state';

import { DegreesComponent } from './degrees.component';

export const DEGREES_ROUTES: Routes = [
  {
    path: '',
    providers: [
      state.DegreesService,
      state.DegreesFacade,
      importProvidersFrom(
        StoreModule.forFeature(state.degreesFeatureKey, state.reducer),
        EffectsModule.forFeature([state.DegreesEffects])
      ),
    ],
    children: [
      {
        path: '',
        component: DegreesComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./degrees-list/degrees-list.component').then(
                (c) => c.DegreesListComponent
              ),
          },
        ],
      },
    ],
  },
];

import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { auth } from '@skooltrak-app/state';

import { SignInComponent } from './sign-in/sign-in.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(auth.authFeatureKey, auth.reducer),
        EffectsModule.forFeature([auth.AuthEffects]),
        MatSnackBarModule
      ),
    ],
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
    ],
  },
];

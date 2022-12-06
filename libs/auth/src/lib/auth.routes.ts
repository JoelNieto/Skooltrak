import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { auth } from '@skooltrak-app/state';

import { SignInComponent } from './sign-in/sign-in.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState(auth.authFeatureKey, auth.reducer),
      provideEffects(auth.AuthEffects),
      importProvidersFrom(MatSnackBarModule),
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

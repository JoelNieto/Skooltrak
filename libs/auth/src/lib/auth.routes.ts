import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
];

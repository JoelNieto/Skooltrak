import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: 'sign-in' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AuthRoutingModule {}

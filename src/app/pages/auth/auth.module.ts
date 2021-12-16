import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { AuthRoutingModule } from './auth.routes';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [SignInComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}

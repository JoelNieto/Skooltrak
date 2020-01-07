import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routes';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  declarations: [AuthComponent, SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }

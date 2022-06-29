import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SignInComponent } from './sign-in/sign-in.component';

const authRoutes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [SignInComponent],
})
export class AuthModule {}

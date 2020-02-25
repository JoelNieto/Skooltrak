import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { ChangePasswordComponent } from './change-password.component';



@NgModule({
  declarations: [ChangePasswordComponent],
  exports: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ]
})
export class ChangePasswordModule { }

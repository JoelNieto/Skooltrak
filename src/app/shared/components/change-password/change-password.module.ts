import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ChangePasswordComponent } from './change-password.component';



@NgModule({
  declarations: [ChangePasswordComponent],
  exports: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class ChangePasswordModule { }

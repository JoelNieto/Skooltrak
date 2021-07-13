import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { CustomDatePickerModule } from '../custom-datepicker/custom-datepicker.module';
import { CustomSelectModule } from '../custom-select/custom-select.module';
import { CustomFormComponent } from './custom-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    CustomSelectModule,
    CustomDatePickerModule,
  ],
  declarations: [CustomFormComponent],
  exports: [CustomFormComponent],
})
export class CustomFormModule {}

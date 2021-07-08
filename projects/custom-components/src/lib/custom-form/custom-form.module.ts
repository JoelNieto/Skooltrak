import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { CustomSelectModule } from '../custom-select/custom-select.module';
import { CustomFormComponent } from './custom-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    CustomSelectModule,
  ],
  declarations: [CustomFormComponent],
  exports: [CustomFormComponent],
})
export class CustomFormModule {}

import { NgModule } from '@angular/core';

import { CustomDatePickerModule } from './custom-datepicker/custom-datepicker.module';
import { CustomFormModule } from './custom-form/custom-form.module';
import { CustomSelectModule } from './custom-select/custom-select.module';
import { CustomTableModule } from './custom-table/custom-table.module';
import { FloatingDatepickerModule } from './floating-datepicker/floating-datepicker.module';
import { LoadingModalModule } from './loading-modal/loading-modal.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  exports: [
    CustomDatePickerModule,
    CustomTableModule,
    FloatingDatepickerModule,
    CustomFormModule,
    PipesModule,
    LoadingModalModule,
    CustomSelectModule,
  ],
})
export class CustomComponentsModule {}

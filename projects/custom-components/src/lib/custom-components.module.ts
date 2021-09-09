import { NgModule } from '@angular/core';

import { CustomDatePickerModule } from './components/custom-datepicker/custom-datepicker.module';
import { CustomFormModule } from './components/custom-form/custom-form.module';
import { CustomSelectModule } from './components/custom-select/custom-select.module';
import { CustomTableModule } from './components/custom-table/custom-table.module';
import { FloatingDatepickerModule } from './components/floating-datepicker/floating-datepicker.module';
import { LoadingModalModule } from './components/loading-modal/loading-modal.module';
import { HideOutsideDirective } from './hide-outside.directive';
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
  declarations: [
    HideOutsideDirective
  ],
})
export class CustomComponentsModule {}

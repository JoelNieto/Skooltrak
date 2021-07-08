import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { CustomDatepickerComponent } from './custom-datepicker.component';

@NgModule({
  declarations: [CustomDatepickerComponent],
  imports: [FormsModule, NgbDatepickerModule],
  exports: [CustomDatepickerComponent],
})
export class CustomDatePickerModule {}

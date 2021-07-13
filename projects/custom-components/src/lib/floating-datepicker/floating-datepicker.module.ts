import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { FloatingDatepickerComponent } from './floating-datepicker.component';

@NgModule({
  imports: [NgbDatepickerModule, FormsModule],
  declarations: [FloatingDatepickerComponent],
  exports: [FloatingDatepickerComponent],
})
export class FloatingDatepickerModule {}

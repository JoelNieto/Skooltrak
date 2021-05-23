import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbTimepickerModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { LottieModule } from 'ngx-lottie';

import { ArrayPipe } from './array.pipe';
import { BooleanPipe } from './boolean.pipe';
import { ColumnPipe } from './column.pipe';
import { CustomDatepickerComponent } from './custom-datepicker/custom-datepicker.component';
import { CustomDatetimepickerComponent } from './custom-datetimepicker/custom-datetimepicker.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { FloatingDatepickerComponent } from './floating-datepicker/floating-datepicker.component';
import { LoadingErrorComponent } from './loading-error/loading-error.component';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModalModule,
    TranslocoModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbDropdownModule,
    NgbTooltipModule,
    LottieModule,
  ],
  exports: [
    CustomTableComponent,
    CustomDatepickerComponent,
    FloatingDatepickerComponent,
    PaginatorComponent,
    CustomFormComponent,
    LoadingModalComponent,
    LoadingErrorComponent,
    CustomSelectComponent,
  ],
  declarations: [
    CustomTableComponent,
    CustomDatepickerComponent,
    PaginatorComponent,
    CustomFormComponent,
    LoadingModalComponent,
    CustomSelectComponent,
    ArrayPipe,
    BooleanPipe,
    ColumnPipe,
    FloatingDatepickerComponent,
    CustomDatetimepickerComponent,
    LoadingErrorComponent,
  ],
  entryComponents: [CustomFormComponent],
})
export class CustomComponentsModule {}

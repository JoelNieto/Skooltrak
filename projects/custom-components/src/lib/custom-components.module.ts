import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { ArrayPipe } from './array.pipe';
import { BooleanPipe } from './boolean.pipe';
import { ColumnPipe } from './column.pipe';
import { CustomDatepickerComponent } from './custom-datepicker/custom-datepicker.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { FloatingDatepickerComponent } from './floating-datepicker/floating-datepicker.component';
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
    NgbTooltipModule,
    SweetAlert2Module
  ],
  exports: [
    CustomTableComponent,
    CustomDatepickerComponent,
    FloatingDatepickerComponent,
    PaginatorComponent,
    CustomFormComponent,
    LoadingModalComponent,
    CustomSelectComponent
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
    FloatingDatepickerComponent
  ],
  entryComponents: [CustomFormComponent]
})
export class CustomComponentsModule {}

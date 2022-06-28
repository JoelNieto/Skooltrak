import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomDatePickerModule, CustomTableModule, LoadingModalModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { StudentsSearchModule } from 'src/app/shared/components/students-search/students-search.module';

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collections.routes';
import { EnrollCostsComponent } from './enroll-costs/enroll-costs.component';
import { PaymentDaysComponent } from './payment-days/payment-days.component';
import { PaymentFormsComponent } from './payment-forms/payment-forms.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    CollectionComponent,
    EnrollCostsComponent,
    PaymentDaysComponent,
    PaymentsComponent,
    PaymentFormsComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    CalendarModule,
    StudentsSearchModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CustomTableModule,
    CustomDatePickerModule,
    LoadingModalModule,
    TranslocoModule,
  ],
  providers: [CurrencyPipe, DatePipe],
})
export class CollectionModule {}

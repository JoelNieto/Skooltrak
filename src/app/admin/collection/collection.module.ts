import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collections.routes';
import { EnrollCostsComponent } from './enroll-costs/enroll-costs.component';
import { PaymentDaysComponent } from './payment-days/payment-days.component';
import { PaymentFormsComponent } from './payment-forms/payment-forms.component';
import { PaymentsComponent } from './payments/payments.component';
import { StudentsSearchModule } from 'src/app/shared/components/students-search/students-search.module';

@NgModule({
  declarations: [
    CollectionComponent,
    EnrollCostsComponent,
    PaymentDaysComponent,
    PaymentsComponent,
    PaymentFormsComponent
  ],
  imports: [
    CommonModule,
    NgbTabsetModule,
    CollectionRoutingModule,
    CalendarModule,
    StudentsSearchModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CustomComponentsModule,
    TranslateModule.forChild()
  ],
  providers: [CurrencyPipe, DatePipe]
})
export class CollectionModule {}

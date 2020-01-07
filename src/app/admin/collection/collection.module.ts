import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'custom-components';
import { CalendarModule } from 'angular-calendar';

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collections.routes';
import { EnrollCostsComponent } from './enroll-costs/enroll-costs.component';
import { PaymentDaysComponent } from './payment-days/payment-days.component';
import { FormsModule } from '@angular/forms';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [
    CollectionComponent,
    EnrollCostsComponent,
    PaymentDaysComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    NgbTabsetModule,
    CollectionRoutingModule,
    CalendarModule,
    FormsModule,
    CustomComponentsModule,
    TranslateModule.forChild()
  ]
})
export class CollectionModule {}

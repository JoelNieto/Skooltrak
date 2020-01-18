import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'angular-calendar';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { CollectionComponent } from './collection.component';
import { CollectionRoutingModule } from './collections.routes';
import { EnrollCostsComponent } from './enroll-costs/enroll-costs.component';
import { PaymentDaysComponent } from './payment-days/payment-days.component';
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
  ],
  providers: [CurrencyPipe]
})
export class CollectionModule {}

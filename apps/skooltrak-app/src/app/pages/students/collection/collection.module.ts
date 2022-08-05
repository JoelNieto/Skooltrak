import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbNavModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';

import { BalanceComponent } from './balance/balance.component';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [CollectionComponent, BalanceComponent, PaymentsComponent],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    TranslocoModule,
    NgbNavModule,
    NgbPopoverModule,
  ],
})
export class CollectionModule {}

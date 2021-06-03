import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';

import { BalanceComponent } from './balance/balance.component';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';

@NgModule({
  declarations: [CollectionComponent, BalanceComponent],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    TranslocoModule,
    NgbNavModule,
  ],
})
export class CollectionModule {}

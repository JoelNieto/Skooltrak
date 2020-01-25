import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionComponent } from './collection.component';
import { PaymentFormsComponent } from './payment-forms/payment-forms.component';

const routes: Routes = [
  { path: '', component: CollectionComponent },
  { path: 'new-payment', component: PaymentFormsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class CollectionRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { IncidentsComponent } from './incidents.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  { path: '', component: IncidentsComponent },
  { path: 'new', component: NewComponent },
  { path: ':id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentsRoutingModule {}

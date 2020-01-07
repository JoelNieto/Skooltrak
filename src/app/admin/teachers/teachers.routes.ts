import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { TeachersComponent } from './teachers.component';

const routes: Routes = [
  { path: '', component: TeachersComponent },
  { path: ':id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class TeachersRoutingModule {}

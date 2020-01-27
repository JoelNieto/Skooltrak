import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchoolsEditComponent } from './schools-edit/schools-edit.component';
import { SchoolsNewComponent } from './schools-new/schools-new.component';
import { SchoolsComponent } from './schools.component';

const routes: Routes = [
  { path: '', component: SchoolsComponent },
  { path: 'new', component: SchoolsNewComponent },
  { path: ':id', component: SchoolsEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class SchoolsRoutingModule {}

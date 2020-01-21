import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssignmentTypesComponent } from './assignment-types/assignment-types.component';
import { DegreesComponent } from './degrees/degrees.component';
import { SettingsComponent } from './settings.component';
import { SubjectsComponent } from './subjects/subjects.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'Subjects', component: SubjectsComponent },
  { path: 'Degrees', component: DegreesComponent },
  { path: 'AssignmentTypes', component: AssignmentTypesComponent },
  {
    path: 'Plans',
    loadChildren: () => import('./plans/plans.module').then(m => m.PlansModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class SettingsRoutingModule {}

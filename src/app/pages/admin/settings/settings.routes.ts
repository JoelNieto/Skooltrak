import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssignmentTypesComponent } from './assignment-types/assignment-types.component';
import { DegreesComponent } from './degrees/degrees.component';
import { PeriodsComponent } from './periods/periods.component';
import { SettingsComponent } from './settings.component';
import { SkillsComponent } from './skills/skills.component';
import { SubjectsComponent } from './subjects/subjects.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'degrees', component: DegreesComponent },
  { path: 'periods', component: PeriodsComponent },
  { path: 'skills', component: SkillsComponent },
  {
    path: 'schools',
    loadChildren: () =>
      import('./schools/schools.module').then((m) => m.SchoolsModule),
  },
  { path: 'assignment-types', component: AssignmentTypesComponent },
  {
    path: 'plans',
    loadChildren: () =>
      import('./plans/plans.module').then((m) => m.PlansModule),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class SettingsRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssignmentTypesComponent } from './assignment-types/assignment-types.component';
import { CleaningComponent } from './cleaning/cleaning.component';
import { DegreesComponent } from './degrees/degrees.component';
import { MessagesComponent } from './messages/messages.component';
import { PeriodsComponent } from './periods/periods.component';
import { SettingsComponent } from './settings.component';
import { SkillsComponent } from './skills/skills.component';
import { SubjectsComponent } from './subjects/subjects.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'subjects', component: SubjectsComponent },
  {
    path: 'security',
    loadChildren: () =>
      import('./security/security.module').then((m) => m.SecurityModule),
  },
  { path: 'degrees', component: DegreesComponent },
  { path: 'cleaning', component: CleaningComponent },
  { path: 'periods', component: PeriodsComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'messages', component: MessagesComponent },
  {
    path: 'exams',
    loadChildren: () =>
      import('./exams/exams.module').then((m) => m.ExamsModule),
  },
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

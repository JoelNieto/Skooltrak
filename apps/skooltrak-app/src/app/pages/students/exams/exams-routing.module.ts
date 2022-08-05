import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamsComponent } from './exams.component';
import { CanActivateGuard, CanDeactivateGuard } from './form/exam.guard';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: ExamsComponent },
  {
    path: ':id',
    component: FormComponent,
    canActivate: [CanActivateGuard],
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamsRoutingModule {}

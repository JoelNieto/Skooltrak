import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExamComponent } from './edit-exam/edit-exam.component';

import { ExamsComponent } from './exams.component';
import { NewExamComponent } from './new-exam/new-exam.component';

const routes: Routes = [
  { path: '', component: ExamsComponent },
  { path: 'new', component: NewExamComponent },
  { path: ':id', component: EditExamComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamsRoutingModule {}

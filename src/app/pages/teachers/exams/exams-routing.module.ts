import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExamComponent } from './edit-exam/edit-exam.component';

import { ExamsComponent } from './exams.component';
import { NewExamComponent } from './new-exam/new-exam.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', component: ExamsComponent },
  { path: 'new', component: NewExamComponent },
  { path: ':id', component: EditExamComponent },
  { path: 'results/:id', component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamsRoutingModule {}

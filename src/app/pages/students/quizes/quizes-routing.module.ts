import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { QuizesComponent } from './quizes.component';

const routes: Routes = [
  { path: '', component: QuizesComponent },
  { path: ':id', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizesRoutingModule {}

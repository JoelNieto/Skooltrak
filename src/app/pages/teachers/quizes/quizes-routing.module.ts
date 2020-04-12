import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssignationsResultsComponent } from './assignations-results/assignations-results.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { QuizesComponent } from './quizes.component';

const routes: Routes = [
  { path: '', component: QuizesComponent },
  { path: 'new', component: NewQuizComponent },
  { path: ':id', component: EditQuizComponent },
  { path: 'results/:id', component: AssignationsResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizesRoutingModule {}

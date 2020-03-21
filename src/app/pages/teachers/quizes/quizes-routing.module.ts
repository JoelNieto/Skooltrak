import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizesComponent } from './quizes.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';

const routes: Routes = [
  { path: '', component: QuizesComponent },
  { path: 'new', component: NewQuizComponent },
  { path: ':id', component: EditQuizComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizesRoutingModule {}

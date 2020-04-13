import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { SharedModule } from 'src/app/shared/shared.module';

import { AnswersFormComponent } from './answers-form/answers-form.component';
import { AssignationComponent } from './assignation/assignation.component';
import { AssignationsResultsComponent } from './assignations-results/assignations-results.component';
import { AssignationsComponent } from './assignations/assignations.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuizPreviewComponent } from './quiz-preview/quiz-preview.component';
import { QuizesFormComponent } from './quizes-form/quizes-form.component';
import { QuizesRoutingModule } from './quizes-routing.module';
import { QuizesComponent } from './quizes.component';

@NgModule({
  declarations: [
    QuizesComponent,
    NewQuizComponent,
    AnswersFormComponent,
    EditQuizComponent,
    QuestionFormComponent,
    QuizPreviewComponent,
    QuizesFormComponent,
    AssignationComponent,
    AssignationsComponent,
    AssignationsResultsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbModalModule,
    SharedModule,
    QuizesRoutingModule,
    CustomComponentsModule,
    TranslocoModule,
    NgbTimepickerModule
  ]
})
export class QuizesModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { AnswersFormComponent } from './answers-form/answers-form.component';
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
    QuizesFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    QuizesRoutingModule,
    CustomComponentsModule,
    TranslateModule.forChild()
  ]
})
export class QuizesModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomTableModule, LoadingModalModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';
import { SharedModule } from 'src/app/shared/shared.module';

import { AssignationComponent } from './assignation/assignation.component';
import { AssignationsResultsComponent } from './assignations-results/assignations-results.component';
import { AssignationsComponent } from './assignations/assignations.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuizPreviewComponent } from './quiz-preview/quiz-preview.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizesFormComponent } from './quizes-form/quizes-form.component';
import { QuizesRoutingModule } from './quizes-routing.module';
import { QuizesComponent } from './quizes.component';

@NgModule({
  declarations: [
    QuizesComponent,
    NewQuizComponent,
    EditQuizComponent,
    QuestionFormComponent,
    QuizPreviewComponent,
    QuizesFormComponent,
    AssignationComponent,
    AssignationsComponent,
    AssignationsResultsComponent,
    QuizResultComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbModalModule,
    NgxSummernoteModule,
    SharedModule,
    QuizesRoutingModule,
    TranslocoModule,
    CustomTableModule,
    LoadingModalModule,
    NgbTimepickerModule,
  ],
})
export class QuizesModule {}

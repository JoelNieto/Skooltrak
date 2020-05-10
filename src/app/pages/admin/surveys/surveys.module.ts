import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { ChartsModule } from 'ng2-charts';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionResultComponent } from './question-result/question-result.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveysComponent } from './surveys.component';


@NgModule({
  declarations: [
    SurveysComponent,
    NewSurveyComponent,
    SurveyFormComponent,
    QuestionFormComponent,
    SurveyDetailsComponent,
    QuestionResultComponent,
  ],
  imports: [
    CommonModule,
    SurveysRoutingModule,
    CustomComponentsModule,
    FormsModule,
    ChartsModule,
    NgbTimepickerModule,
    ReactiveFormsModule,
    TranslocoModule,
    NgbNavModule,
    NgxSummernoteModule,
  ],
})
export class SurveysModule {}
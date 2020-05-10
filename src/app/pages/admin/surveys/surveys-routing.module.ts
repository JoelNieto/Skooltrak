import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewSurveyComponent } from './new-survey/new-survey.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { SurveysComponent } from './surveys.component';

const routes: Routes = [
  { path: '', component: SurveysComponent },
  { path: 'new', component: NewSurveyComponent },
  { path: ':id', component: SurveyDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveysRoutingModule {}

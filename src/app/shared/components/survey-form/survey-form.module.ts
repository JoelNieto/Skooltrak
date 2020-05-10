import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';

import { SurveyFormComponent } from './survey-form.component';


@NgModule({
  declarations: [SurveyFormComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [SurveyFormComponent]
})
export class SurveyFormModule { }

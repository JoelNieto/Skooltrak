import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxSummernoteModule } from 'ngx-summernote';

import { SurveyFormComponent } from './survey-form.component';


@NgModule({
  declarations: [SurveyFormComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    NgxSummernoteModule
  ],
  exports: [SurveyFormComponent]
})
export class SurveyFormModule { }

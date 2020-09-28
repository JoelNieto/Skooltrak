import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';

import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsComponent } from './exams.component';
import { CanDeactivateGuard } from './form/exam.guard';
import { FormComponent } from './form/form.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [ExamsComponent, ResultsComponent, FormComponent, MatchFormComponent],
  imports: [
    CommonModule,
    ExamsRoutingModule,
    NgbNavModule,
    FormsModule,
    NgbModalModule,
    ReactiveFormsModule,
    TranslocoModule,
    NgxSummernoteModule,
    DragDropModule,
    CustomComponentsModule
  ],
  providers: [CanDeactivateGuard]
})
export class ExamsModule {}

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { LoadingModalModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';
import { SharedModule } from 'src/app/shared/shared.module';

import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsComponent } from './exams.component';
import { CanActivateGuard, CanDeactivateGuard } from './form/exam.guard';
import { FormComponent } from './form/form.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { ResultDetailsComponent } from './result-details/result-details.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    ExamsComponent,
    ResultsComponent,
    FormComponent,
    MatchFormComponent,
    ResultDetailsComponent,
  ],
  imports: [
    CommonModule,
    ExamsRoutingModule,
    NgbNavModule,
    FormsModule,
    NgbModalModule,
    SharedModule,
    ReactiveFormsModule,
    TranslocoModule,
    NgxSummernoteModule,
    LoadingModalModule,
    DragDropModule,
    NgbModalModule,
  ],
  providers: [CanDeactivateGuard, CanActivateGuard],
})
export class ExamsModule {}

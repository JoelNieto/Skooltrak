import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';

import { EditExamComponent } from './edit-exam/edit-exam.component';
import { ExamsFormComponent } from './exams-form/exams-form.component';
import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsComponent } from './exams.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { NewExamComponent } from './new-exam/new-exam.component';
import { PreviewComponent } from './preview/preview.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { SelectionOptionsComponent } from './selection-options/selection-options.component';
import { PreviewMatchComponent } from './preview-match/preview-match.component';

@NgModule({
  declarations: [
    ExamsComponent,
    ExamsFormComponent,
    NewExamComponent,
    EditExamComponent,
    QuestionFormComponent,
    SelectionOptionsComponent,
    MatchFormComponent,
    PreviewComponent,
    PreviewMatchComponent,
  ],
  imports: [
    CommonModule,
    ExamsRoutingModule,
    FormsModule,
    NgbModalModule,
    NgbNavModule,
    NgxSummernoteModule,
    TranslocoModule,
    ReactiveFormsModule,
    CustomComponentsModule,
    DragDropModule,
  ],
})
export class ExamsModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { NgxSummernoteModule } from 'ngx-summernote';
import { AssignmentFormModule } from 'src/app/shared/components/assignment-form/assignment-form.module';
import { DocumentsFormModule } from 'src/app/shared/components/documents-form/documents-form.module';

import { VideosModule } from '../videos/videos.module';
import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsComponent } from './assignments.component';
import { DetailsComponent } from './details/details.component';
import { DocumentsComponent } from './documents/documents.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AssignmentsComponent,
    DetailsComponent,
    DocumentsComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    AssignmentsRoutingModule,
    NgbNavModule,
    TranslocoModule,
    NgbModalModule,
    VideosModule,
    DocumentsFormModule,
    AssignmentFormModule,
    AssignmentFormModule,
    CalendarModule,
    NgxSummernoteModule,
    CustomComponentsModule,
  ],
})
export class AssignmentsModule {}

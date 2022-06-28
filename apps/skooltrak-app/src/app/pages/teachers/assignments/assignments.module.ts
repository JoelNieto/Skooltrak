import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TippyModule } from '@ngneat/helipopper';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomDatePickerModule, LoadingModalModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { NgxSummernoteModule } from 'ngx-summernote';
import { AssignmentFormModule } from 'src/app/shared/components/assignment-form/assignment-form.module';
import { DocumentsFormModule } from 'src/app/shared/components/documents-form/documents-form.module';
import { EditorjsModule } from 'src/app/shared/components/editorjs/editorjs.module';
import { AvatarPipe } from 'src/app/shared/pipes/avatar.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

import { VideosModule } from '../videos/videos.module';
import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsComponent } from './assignments.component';
import { DetailsComponent } from './details/details.component';
import { DocumentsComponent } from './documents/documents.component';
import { FormComponent } from './form/form.component';
import { ForumComponent } from './forum/forum.component';

@NgModule({
  declarations: [
    AssignmentsComponent,
    DetailsComponent,
    DocumentsComponent,
    FormComponent,
    ForumComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    AssignmentsRoutingModule,
    NgbNavModule,
    TranslocoModule,
    EditorjsModule,
    NgbModalModule,
    VideosModule,
    DocumentsFormModule,
    AssignmentFormModule,
    AssignmentFormModule,
    CalendarModule,
    NgxSummernoteModule,
    CustomDatePickerModule,
    LoadingModalModule,
    TippyModule,
    NgbDropdownModule,
    SharedModule,
  ],
  providers: [AvatarPipe],
})
export class AssignmentsModule {}

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { NgxSummernoteModule } from 'ngx-summernote';
import { AssignmentFormModule } from 'src/app/shared/components/assignment-form/assignment-form.module';
import { DocumentsFormModule } from 'src/app/shared/components/documents-form/documents-form.module';
import { AvatarPipe } from 'src/app/shared/pipes/avatar.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

import { VideosModule } from '../../teachers/videos/videos.module';
import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsComponent } from './assignments.component';
import { DetailsComponent } from './details/details.component';
import { DocumentsComponent } from './documents/documents.component';
import { ForumComponent } from './forum/forum.component';

@NgModule({
  declarations: [
    AssignmentsComponent,
    DetailsComponent,
    DocumentsComponent,
    ForumComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AssignmentsRoutingModule,
    NgbTooltipModule,
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
    OverlayModule,
    SharedModule,
  ],
  providers: [AvatarPipe],
})
export class AssignmentsModule {}
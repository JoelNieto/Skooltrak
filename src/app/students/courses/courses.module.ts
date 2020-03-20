import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { NgxSummernoteModule } from 'ngx-summernote';
import { SharedModule } from 'src/app/shared/shared.module';

import { ContentComponent } from './content/content.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { DocumentsComponent } from './documents/documents.component';
import { ForumsComponent } from './forums/forums.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    ContentComponent,
    ForumsComponent,
    DocumentsComponent,
    ScheduleComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    SharedModule,
    CalendarModule,
    NgxSummernoteModule,
    CoursesRoutingModule,
    CustomComponentsModule,
    TranslocoModule
  ]
})
export class CoursesModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { NgxSummernoteModule } from 'ngx-summernote';
import { AssignmentFormModule } from 'src/app/shared/components/assignment-form/assignment-form.module';
import { ContentFormModule } from 'src/app/shared/components/content-form/content-form.module';
import { DocumentsFormModule } from 'src/app/shared/components/documents-form/documents-form.module';
import { VideoPlayerModule } from 'src/app/shared/components/video-player/video-player.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ContentComponent } from './content/content.component';
import { CourseGradesComponent } from './course-grades/course-grades.component';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';
import { CourseWhiteboardComponent } from './course-whiteboard/course-whiteboard.component';
import { CoursesDetailsComponent } from './courses-details/courses-details.component';
import { CoursesDocumentsComponent } from './courses-documents/courses-documents.component';
import { CoursesMessagesComponent } from './courses-messages/courses-messages.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { ForumsComponent } from './forums/forums.component';
import { GradesFormComponent } from './grades-form/grades-form.component';
import { StudentGradeItemComponent } from './student-grade-item/student-grade-item.component';
import { StudentsComponent } from './students/students.component';
import { CoursesVideosComponent } from './courses-videos/courses-videos.component';
import { MeetingComponent } from './meeting/meeting.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDetailsComponent,
    CoursesDocumentsComponent,
    CoursesMessagesComponent,
    ForumsComponent,
    CourseGradesComponent,
    GradesFormComponent,
    StudentGradeItemComponent,
    CourseScheduleComponent,
    ContentComponent,
    CourseWhiteboardComponent,
    StudentsComponent,
    CoursesVideosComponent,
    MeetingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    VideoPlayerModule,
    CanvasWhiteboardModule,
    CalendarModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    ContentFormModule,
    CustomComponentsModule,
    DocumentsFormModule,
    AssignmentFormModule,
    NgbTooltipModule,
    NgbNavModule,
    NgxSummernoteModule,
    TranslocoModule
  ]
})
export class CoursesModule {}

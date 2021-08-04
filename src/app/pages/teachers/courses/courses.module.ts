import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomDatePickerModule, CustomTableModule, LoadingModalModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { NgxSummernoteModule } from 'ngx-summernote';
import { AssignmentFormModule } from 'src/app/shared/components/assignment-form/assignment-form.module';
import { ContentFormModule } from 'src/app/shared/components/content-form/content-form.module';
import { CourseEditModule } from 'src/app/shared/components/course-edit/course-edit.module';
import { CourseGradesModule } from 'src/app/shared/components/course-grades/course-grades.module';
import { DocumentsFormModule } from 'src/app/shared/components/documents-form/documents-form.module';
import { VideoPlayerModule } from 'src/app/shared/components/video-player/video-player.module';
import { CourseResolver } from 'src/app/shared/resolvers/course.resolver';
import { SharedModule } from 'src/app/shared/shared.module';

import { AttendanceFormComponent } from './attendance-form/attendance-form.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ClassroomPageComponent } from './classroom-page/classroom-page.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { ContentComponent } from './content/content.component';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';
import { CoursesDetailsComponent } from './courses-details/courses-details.component';
import { CoursesDocumentsComponent } from './courses-documents/courses-documents.component';
import { CoursesMessagesComponent } from './courses-messages/courses-messages.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesVideosComponent } from './courses-videos/courses-videos.component';
import { CoursesComponent } from './courses.component';
import { ForumsComponent } from './forums/forums.component';
import { MeetingComponent } from './meeting/meeting.component';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDetailsComponent,
    CoursesDocumentsComponent,
    CoursesMessagesComponent,
    ForumsComponent,
    CourseScheduleComponent,
    ContentComponent,
    StudentsComponent,
    CoursesVideosComponent,
    MeetingComponent,
    AttendanceComponent,
    AttendanceFormComponent,
    ClassroomsComponent,
    ClassroomPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CourseEditModule,
    VideoPlayerModule,
    CalendarModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    ContentFormModule,
    CustomDatePickerModule,
    LoadingModalModule,
    CustomTableModule,
    DocumentsFormModule,
    AssignmentFormModule,
    NgbTooltipModule,
    NgbNavModule,
    NgxSummernoteModule,
    TranslocoModule,
    CourseGradesModule,
  ],
  providers: [CourseResolver],
})
export class CoursesModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { LoadingModalModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { NgxSummernoteModule } from 'ngx-summernote';
import { VideoPlayerModule } from 'src/app/shared/components/video-player/video-player.module';
import { CourseResolver } from 'src/app/shared/resolvers/course.resolver';
import { SharedModule } from 'src/app/shared/shared.module';

import { ClassroomPageComponent } from './classroom-page/classroom-page.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { ContentComponent } from './content/content.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { DocumentsComponent } from './documents/documents.component';
import { ForumsComponent } from './forums/forums.component';
import { ListComponent } from './list/list.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { MessagesComponent } from './messages/messages.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { VideosComponent } from './videos/videos.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    ContentComponent,
    ForumsComponent,
    DocumentsComponent,
    ScheduleComponent,
    MessagesComponent,
    VideosComponent,
    MeetingsComponent,
    ClassroomsComponent,
    ClassroomPageComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    SharedModule,
    CalendarModule,
    NgbTooltipModule,
    NgxSummernoteModule,
    CoursesRoutingModule,
    LoadingModalModule,
    TranslocoModule,
    VideoPlayerModule,
  ],
  providers: [CourseResolver],
})
export class CoursesModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { NgxSummernoteModule } from 'ngx-summernote';
import { VideoPlayerModule } from 'src/app/shared/components/video-player/video-player.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ContentComponent } from './content/content.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { DocumentsComponent } from './documents/documents.component';
import { ForumsComponent } from './forums/forums.component';
import { MessagesComponent } from './messages/messages.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { VideosComponent } from './videos/videos.component';
import { MeetingsComponent } from './meetings/meetings.component';

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
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    SharedModule,
    CalendarModule,
    NgbTooltipModule,
    NgxSummernoteModule,
    CoursesRoutingModule,
    CustomComponentsModule,
    TranslocoModule,
    VideoPlayerModule,
  ],
})
export class CoursesModule {}

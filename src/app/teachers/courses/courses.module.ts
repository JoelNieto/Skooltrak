import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { NgxSummernoteModule } from 'ngx-summernote';
import { SharedModule } from 'src/app/shared/shared.module';

import { CourseGradesComponent } from './course-grades/course-grades.component';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';
import { CoursesDetailsComponent } from './courses-details/courses-details.component';
import { CoursesDocumentsComponent } from './courses-documents/courses-documents.component';
import { CoursesMessagesComponent } from './courses-messages/courses-messages.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { DocumentsFormComponent } from './documents-form/documents-form.component';
import { ForumsComponent } from './forums/forums.component';
import { GradesFormComponent } from './grades-form/grades-form.component';
import { StudentGradeItemComponent } from './student-grade-item/student-grade-item.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDetailsComponent,
    CoursesDocumentsComponent,
    DocumentsFormComponent,
    CoursesMessagesComponent,
    ForumsComponent,
    CourseGradesComponent,
    GradesFormComponent,
    StudentGradeItemComponent,
    CourseScheduleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    CustomComponentsModule,
    NgbModule,
    NgxSummernoteModule,
    TranslocoModule
  ]
})
export class CoursesModule {}

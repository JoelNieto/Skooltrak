import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';
import { SharedModule } from 'src/app/shared/shared.module';

import { CourseGradesComponent } from './course-grades/course-grades.component';
import { CoursesDetailsComponent } from './courses-details/courses-details.component';
import { CoursesDocumentsComponent } from './courses-documents/courses-documents.component';
import { CoursesMessagesComponent } from './courses-messages/courses-messages.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { DocumentsFormComponent } from './documents-form/documents-form.component';
import { ForumsComponent } from './forums/forums.component';
import { GradesFormComponent } from './grades-form/grades-form.component';
import { StudentGradeItemComponent } from './student-grade-item/student-grade-item.component';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';

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
    ReactiveFormsModule,
    CoursesRoutingModule,
    CustomComponentsModule,
    NgbModule,
    NgxSummernoteModule,
    TranslateModule.forChild()
  ]
})
export class CoursesModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomDatePickerModule, CustomTableModule, LoadingModalModule } from '@skooltrak/custom-components';
import { CourseGradesModule } from 'src/app/shared/components/course-grades/course-grades.module';

import { ClassroomPageComponent } from './classroom-page/classroom-page.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses.routes';
import { DetailsComponent } from './details/details.component';
import { DocumentFormComponent } from './document-form/document-form.component';
import { DocumentsComponent } from './documents/documents.component';

@NgModule({
  declarations: [
    CoursesComponent,
    DetailsComponent,
    DocumentsComponent,
    DocumentFormComponent,
    ClassroomsComponent,
    ClassroomPageComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    NgbModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    NgbNavModule,
    TranslocoModule,
    CustomDatePickerModule,
    LoadingModalModule,
    CustomTableModule,
    CourseGradesModule,
  ],
})
export class CoursesModule {}

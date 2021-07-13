import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomDatePickerModule, CustomTableModule, LoadingModalModule } from '@skooltrak/custom-components';

import { ClassroomPageComponent } from './classroom-page/classroom-page.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses.routes';
import { DetailsComponent } from './details/details.component';
import { DocumentFormComponent } from './document-form/document-form.component';
import { DocumentsComponent } from './documents/documents.component';
import { GradesDetailsComponent } from './grades-details/grades-details.component';
import { GradesFormComponent } from './grades-form/grades-form.component';
import { GradesComponent } from './grades/grades.component';
import { StudentGradeItemComponent } from './student-grade-item/student-grade-item.component';

@NgModule({
  declarations: [
    CoursesComponent,
    DetailsComponent,
    DocumentsComponent,
    DocumentFormComponent,
    GradesComponent,
    GradesDetailsComponent,
    GradesFormComponent,
    StudentGradeItemComponent,
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
  ],
})
export class CoursesModule {}

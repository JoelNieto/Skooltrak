import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomDatePickerModule, LoadingModalModule } from '@skooltrak/custom-components';

import { ClosedGradesComponent } from './closed-grades/closed-grades.component';
import { CourseGradesComponent } from './course-grades.component';
import { GradesFormComponent } from './grades-form/grades-form.component';
import { GradesGroupComponent } from './grades-group/grades-group.component';
import { StudentGradeItemComponent } from './student-grade-item/student-grade-item.component';

@NgModule({
  declarations: [
    CourseGradesComponent,
    GradesFormComponent,
    GradesGroupComponent,
    StudentGradeItemComponent,
    ClosedGradesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    NgbModalModule,
    NgbNavModule,
    CustomDatePickerModule,
    LoadingModalModule,
  ],
  exports: [
    CourseGradesComponent,
    GradesFormComponent,
    GradesGroupComponent,
    StudentGradeItemComponent,
    ClosedGradesComponent,
  ],
})
export class CourseGradesModule {}

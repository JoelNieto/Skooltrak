import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomDatePickerModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';

import { CourseGradesModule } from '../course-grades/course-grades.module';
import { EditorjsModule } from '../editorjs/editorjs.module';
import { AssignmentFormComponent } from './assignment-form.component';
import { GradesComponent } from './grades/grades.component';

@NgModule({
  declarations: [AssignmentFormComponent, GradesComponent],
  exports: [AssignmentFormComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    NgbModalModule,
    EditorjsModule,
    NgxSummernoteModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDatePickerModule,
    NgbNavModule,
    CourseGradesModule,
  ],
})
export class AssignmentFormModule {}

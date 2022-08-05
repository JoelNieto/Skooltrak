import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';

import { CourseEditComponent } from './course-edit.component';

@NgModule({
  declarations: [CourseEditComponent],
  imports: [CommonModule, NgbModalModule, NgbNavModule, TranslocoModule],
  exports: [CourseEditComponent],
})
export class CourseEditModule {}

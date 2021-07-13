import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';

import { AttendanceFormComponent } from './attendance-form/attendance-form.component';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';

@NgModule({
  declarations: [AttendanceComponent, AttendanceFormComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    AttendanceRoutingModule,
  ],
})
export class AttendanceModule {}

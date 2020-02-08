import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';

@NgModule({
  declarations: [AttendanceComponent, AttendanceFormComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    NgbModule,
    CustomComponentsModule,
    ReactiveFormsModule,
    AttendanceRoutingModule
  ]
})
export class AttendanceModule {}

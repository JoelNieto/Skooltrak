import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomTableModule, LoadingModalModule } from '@skooltrak/custom-components';

import { AttendanceFormComponent } from './attendance-form/attendance-form.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { DetailsComponent } from './details/details.component';
import { GroupsComponent } from './groups.component';
import { GroupsRoutingModule } from './groups.routes';
import { ScheduleComponent } from './schedule/schedule.component';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [
    GroupsComponent,
    DetailsComponent,
    StudentsComponent,
    ScheduleComponent,
    AttendanceComponent,
    AttendanceFormComponent,
  ],
  imports: [
    CommonModule,
    CustomTableModule,
    LoadingModalModule,
    NgbModalModule,
    NgbNavModule,
    NgbTimepickerModule,
    FormsModule,
    GroupsRoutingModule,
    TranslocoModule,
  ],
})
export class GroupsModule {}

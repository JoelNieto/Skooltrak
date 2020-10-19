import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { CoursesComponent } from './courses/courses.component';
import { DetailsComponent } from './details/details.component';
import { GroupsComponent } from './groups.component';
import { GroupsRoutingModule } from './groups.routes';
import { ScheduleComponent } from './schedule/schedule.component';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [GroupsComponent, CoursesComponent, DetailsComponent, StudentsComponent, ScheduleComponent],
  imports: [
    CommonModule,
    CustomComponentsModule,
    NgbModule,
    FormsModule,
    GroupsRoutingModule,
    TranslocoModule
  ]
})
export class GroupsModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { CoursesComponent } from './courses/courses.component';
import { DetailsComponent } from './details/details.component';
import { GroupsComponent } from './groups.component';
import { GroupsRoutingModule } from './groups.routes';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [GroupsComponent, CoursesComponent, DetailsComponent, StudentsComponent],
  imports: [
    CommonModule,
    CustomComponentsModule,
    NgbModule,
    GroupsRoutingModule,
    TranslocoModule
  ]
})
export class GroupsModule { }

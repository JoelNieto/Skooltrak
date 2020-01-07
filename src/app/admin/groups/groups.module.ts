import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'custom-components';

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
    NgbTabsetModule,
    GroupsRoutingModule,
    TranslateModule.forChild()
  ]
})
export class GroupsModule { }

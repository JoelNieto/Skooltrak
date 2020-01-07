import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'custom-components';

import { CoursesComponent } from './courses/courses.component';
import { DetailsComponent } from './details/details.component';
import { GroupsComponent } from './groups/groups.component';
import { PlansComponent } from './plans.component';
import { PlansRoutingModule } from './plans.routes';

@NgModule({
  declarations: [
    PlansComponent,
    CoursesComponent,
    GroupsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    CustomComponentsModule,
    FormsModule,
    NgbModalModule,
    NgbTabsetModule,
    TranslateModule.forChild()
  ]
})
export class PlansModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

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
    NgbModule,
    TranslocoModule
  ]
})
export class PlansModule {}

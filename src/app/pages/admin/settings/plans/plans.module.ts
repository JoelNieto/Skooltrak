import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { CoursesComponent } from './courses/courses.component';
import { DetailsComponent } from './details/details.component';
import { GroupsComponent } from './groups/groups.component';
import { PlansComponent } from './plans.component';
import { PlansRoutingModule } from './plans.routes';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';

@NgModule({
  declarations: [
    PlansComponent,
    CoursesComponent,
    GroupsComponent,
    DetailsComponent,
    EvaluationComponent,
    EvaluationFormComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomComponentsModule,
    FormsModule,
    NgbModalModule,
    NgbModule,
    TranslocoModule
  ]
})
export class PlansModule {}

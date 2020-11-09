import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { DetailsComponent } from './details/details.component';
import { GradesDetailsComponent } from './grades-details/grades-details.component';
import { GradesPeriodComponent } from './grades-period/grades-period.component';
import { GradesComponent } from './grades/grades.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';

@NgModule({
  declarations: [GroupsComponent, DetailsComponent, GradesComponent, GradesDetailsComponent, GradesPeriodComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    NgbNavModule,
    NgbTooltipModule,
    FormsModule,
    CustomComponentsModule,
    TranslocoModule,
  ],
})
export class GroupsModule {}

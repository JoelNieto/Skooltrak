import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbCollapseModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { GradesDetailsComponent } from './grades-details/grades-details.component';
import { GradesRoutingModule } from './grades-routing.module';
import { GradesComponent } from './grades.component';
import { PeriodGradeComponent } from './period-grade/period-grade.component';

@NgModule({
  declarations: [GradesComponent, GradesDetailsComponent, PeriodGradeComponent],
  imports: [
    CommonModule,
    NgbCollapseModule,
    GradesRoutingModule,
    NgbTooltipModule,
    CustomComponentsModule,
    NgbNavModule,
    TranslocoModule,
  ],
})
export class GradesModule {}

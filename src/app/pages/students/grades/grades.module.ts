import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';

import { GradesDetailsComponent } from './grades-details/grades-details.component';
import { GradesRoutingModule } from './grades-routing.module';
import { GradesComponent } from './grades.component';

@NgModule({
  declarations: [GradesComponent, GradesDetailsComponent],
  imports: [
    CommonModule,
    NgbCollapseModule,
    GradesRoutingModule,
    NgbTooltipModule,
    TranslocoModule,
  ],
})
export class GradesModule {}

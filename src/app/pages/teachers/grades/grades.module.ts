import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { GradesRoutingModule } from './grades-routing.module';
import { GradesComponent } from './grades.component';
import { PeriodGradesComponent } from './period-grades/period-grades.component';


@NgModule({
  declarations: [GradesComponent, PeriodGradesComponent],
  imports: [
    CommonModule,
    GradesRoutingModule,
    TranslocoModule,
    NgbNavModule,
    CustomComponentsModule,
    FormsModule
  ]
})
export class GradesModule { }

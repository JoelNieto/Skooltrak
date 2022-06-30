import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { LoadingModalModule } from '@skooltrak/custom-components';

import { GradesRoutingModule } from './grades-routing.module';
import { GradesComponent } from './grades.component';
import { PeriodGradesComponent } from './period-grades/period-grades.component';
import { FinalScoreComponent } from './final-score/final-score.component';

@NgModule({
  declarations: [GradesComponent, PeriodGradesComponent, FinalScoreComponent],
  imports: [
    CommonModule,
    GradesRoutingModule,
    TranslocoModule,
    NgbNavModule,
    LoadingModalModule,
    FormsModule,
  ],
})
export class GradesModule {}
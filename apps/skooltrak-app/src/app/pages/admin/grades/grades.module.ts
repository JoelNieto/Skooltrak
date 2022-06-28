import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomSelectModule } from '@skooltrak/custom-components';

import { CreditsComponent } from './credits/credits.component';
import { GradesComponent } from './grades.component';
import { GradesRoutingModule } from './grades.routes';
import { RankingsComponent } from './rankings/rankings.component';

@NgModule({
  declarations: [GradesComponent, CreditsComponent, RankingsComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    GradesRoutingModule,
    CustomSelectModule,
    NgbNavModule,
  ],
})
export class GradesModule {}

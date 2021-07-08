import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { CreditsComponent } from './credits/credits.component';
import { GradesComponent } from './grades.component';
import { GradesRoutingModule } from './grades.routes';

@NgModule({
  declarations: [GradesComponent, CreditsComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    GradesRoutingModule,
    CustomComponentsModule,
    NgbNavModule,
  ],
})
export class GradesModule {}

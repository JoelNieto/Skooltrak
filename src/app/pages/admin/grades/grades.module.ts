import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { GradesComponent } from './grades.component';
import { GradesRoutingModule } from './grades.routes';

@NgModule({
  declarations: [GradesComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    GradesRoutingModule,
    CustomComponentsModule
  ]
})
export class GradesModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { GradesComponent } from './grades.component';
import { GradesRoutingModule } from './grades.routes';


@NgModule({
  declarations: [GradesComponent],
  imports: [
    CommonModule,
    GradesRoutingModule,
    CustomComponentsModule
  ]
})
export class GradesModule { }

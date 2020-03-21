import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { GradesRoutingModule } from './grades-routing.module';
import { GradesComponent } from './grades.component';


@NgModule({
  declarations: [GradesComponent],
  imports: [
    CommonModule,
    GradesRoutingModule,
    TranslocoModule
  ]
})
export class GradesModule { }

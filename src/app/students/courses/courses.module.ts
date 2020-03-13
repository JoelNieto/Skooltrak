import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';


@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    CustomComponentsModule,
    TranslocoModule
  ]
})
export class CoursesModule { }

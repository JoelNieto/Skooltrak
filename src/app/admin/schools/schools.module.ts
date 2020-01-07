import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SchoolsComponent } from './schools.component';
import { SchoolsRoutingModule } from './schools.routes';



@NgModule({
  declarations: [SchoolsComponent],
  imports: [
    CommonModule,
    SchoolsRoutingModule
  ]
})
export class SchoolsModule { }

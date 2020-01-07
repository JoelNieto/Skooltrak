import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'custom-components';

import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses.routes';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [CoursesComponent, DetailsComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    NgbTabsetModule,
    NgbModalModule,
    TranslateModule.forChild(),
    CustomComponentsModule
  ]
})
export class CoursesModule { }

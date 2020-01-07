import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'custom-components';

import { GradesComponent } from './grades.component';
import { GradesRoutingModule } from './grades.routes';


@NgModule({
  declarations: [GradesComponent],
  imports: [
    CommonModule,
    GradesRoutingModule,
    CustomComponentsModule,
    TranslateModule.forChild()
  ]
})
export class GradesModule { }

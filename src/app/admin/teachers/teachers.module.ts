import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'custom-components';

import { DetailsComponent } from './details/details.component';
import { TeachersComponent } from './teachers.component';
import { TeachersRoutingModule } from './teachers.routes';

@NgModule({
  declarations: [TeachersComponent, DetailsComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    CustomComponentsModule,
    TeachersRoutingModule,
    NgbTabsetModule
  ]
})
export class TeachersModule {}

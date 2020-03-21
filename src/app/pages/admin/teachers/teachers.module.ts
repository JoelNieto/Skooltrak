import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { DetailsComponent } from './details/details.component';
import { TeachersComponent } from './teachers.component';
import { TeachersRoutingModule } from './teachers.routes';

@NgModule({
  declarations: [TeachersComponent, DetailsComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    CustomComponentsModule,
    TeachersRoutingModule,
    NgbModule
  ]
})
export class TeachersModule {}
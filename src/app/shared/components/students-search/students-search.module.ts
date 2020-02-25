import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { StudentsSearchComponent } from './students-search.component';

@NgModule({
  declarations: [StudentsSearchComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    TranslocoModule,
    CustomComponentsModule
  ],
  exports: [StudentsSearchComponent]
})
export class StudentsSearchModule {}

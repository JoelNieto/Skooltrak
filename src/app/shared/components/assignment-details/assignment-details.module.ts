import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxSummernoteModule } from 'ngx-summernote';

import { AssignmentDetailsComponent } from './assignment-details.component';

@NgModule({
  declarations: [AssignmentDetailsComponent],
  imports: [CommonModule, NgbModalModule, NgxSummernoteModule, TranslocoModule],
  exports: [AssignmentDetailsComponent]
})
export class AssignmentDetailsModule {}

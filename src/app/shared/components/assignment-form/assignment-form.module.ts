import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';

import { AssignmentFormComponent } from './assignment-form.component';

@NgModule({
  declarations: [AssignmentFormComponent],
  exports: [AssignmentFormComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    NgbModalModule,
    NgxSummernoteModule,
    FormsModule,
    ReactiveFormsModule,
    CustomComponentsModule
  ]
})
export class AssignmentFormModule {}

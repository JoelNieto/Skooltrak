import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxSummernoteModule } from 'ngx-summernote';

import { EditorjsModule } from '../editorjs/editorjs.module';
import { AssignmentDetailsComponent } from './assignment-details.component';

@NgModule({
  declarations: [AssignmentDetailsComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    NgxSummernoteModule,
    TranslocoModule,
    EditorjsModule,
  ],
  exports: [AssignmentDetailsComponent],
})
export class AssignmentDetailsModule {}

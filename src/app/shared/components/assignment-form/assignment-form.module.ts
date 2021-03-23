import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';

import { EditorjsModule } from '../editorjs/editorjs.module';
import { AssignmentFormComponent } from './assignment-form.component';

@NgModule({
  declarations: [AssignmentFormComponent],
  exports: [AssignmentFormComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    NgbModalModule,
    EditorjsModule,
    NgxSummernoteModule,
    FormsModule,
    ReactiveFormsModule,
    CustomComponentsModule
  ]
})
export class AssignmentFormModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';

import { DocumentsFormComponent } from './documents-form.component';


@NgModule({
  declarations: [DocumentsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    TranslocoModule
  ],
  exports: [DocumentsFormComponent]
})
export class DocumentsFormModule { }

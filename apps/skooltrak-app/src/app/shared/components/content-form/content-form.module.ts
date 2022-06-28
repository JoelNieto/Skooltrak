import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxSummernoteModule } from 'ngx-summernote';

import { ContentFormComponent } from './content-form.component';

@NgModule({
  declarations: [ContentFormComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule,
    TranslocoModule,
    NgxSummernoteModule
  ],
  exports: [ContentFormComponent]
})
export class ContentFormModule {}

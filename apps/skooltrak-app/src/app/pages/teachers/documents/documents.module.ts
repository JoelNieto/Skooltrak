import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { DocumentsFormModule } from 'src/app/shared/components/documents-form/documents-form.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';

@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    TranslocoModule,
    DocumentsFormModule,
    NgbNavModule,
    SharedModule,
    NgbModalModule,
  ],
})
export class DocumentsModule {}

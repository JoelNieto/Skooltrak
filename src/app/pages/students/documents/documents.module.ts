import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';
import { MyDocumentsComponent } from './my-documents/my-documents.component';

@NgModule({
  declarations: [
    DocumentsComponent,
    MyDocumentsComponent,
    DocumentDetailsComponent,
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    NgbNavModule,
    FormsModule,
    SharedModule,
  ],
})
export class DocumentsModule {}

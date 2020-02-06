import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses.routes';
import { DetailsComponent } from './details/details.component';
import { DocumentFormComponent } from './document-form/document-form.component';
import { DocumentsComponent } from './documents/documents.component';

@NgModule({
  declarations: [
    CoursesComponent,
    DetailsComponent,
    DocumentsComponent,
    DocumentFormComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    NgbTabsetModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule,
    TranslateModule.forChild(),
    CustomComponentsModule
  ],
  entryComponents: [DocumentFormComponent]
})
export class CoursesModule {}

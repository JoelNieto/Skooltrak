import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { SchoolsEditComponent } from './schools-edit/schools-edit.component';
import { SchoolsFormComponent } from './schools-form/schools-form.component';
import { SchoolsNewComponent } from './schools-new/schools-new.component';
import { SchoolsComponent } from './schools.component';
import { SchoolsRoutingModule } from './schools.routes';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    SchoolsComponent,
    SchoolsFormComponent,
    SchoolsNewComponent,
    SchoolsEditComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    CustomComponentsModule
  ]
})
export class SchoolsModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { ContactFormComponent } from './contact-form/contact-form.component';
import { SchoolsEditComponent } from './schools-edit/schools-edit.component';
import { SchoolsFormComponent } from './schools-form/schools-form.component';
import { SchoolsNewComponent } from './schools-new/schools-new.component';
import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolsComponent } from './schools.component';

@NgModule({
  declarations: [
    SchoolsComponent,
    SchoolsNewComponent,
    SchoolsEditComponent,
    SchoolsFormComponent,
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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { ParentsFormComponent } from './parents-form/parents-form.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentNewComponent } from './student-new/student-new.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsComponent } from './students.component';
import { StudentsRoutingModule } from './students.routes';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { BalanceComponent } from './balance/balance.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsFormComponent,
    ParentsFormComponent,
    StudentNewComponent,
    StudentEditComponent,
    StudentDetailsComponent,
    BalanceComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    CustomComponentsModule,
    TranslateModule.forChild(),
    FormsModule,
    NgbTabsetModule,
    ReactiveFormsModule
  ]
})
export class StudentsModule {}

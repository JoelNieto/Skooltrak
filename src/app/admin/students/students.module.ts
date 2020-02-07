import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { BalanceComponent } from './balance/balance.component';
import { ChargesFormComponent } from './charges-form/charges-form.component';
import { GuardiansFormComponent } from './guardians-form/guardians-form.component';
import { MedicalInfoComponent } from './medical-info/medical-info.component';
import { ParentsFormComponent } from './parents-form/parents-form.component';
import { PaymentsFormComponent } from './payments-form/payments-form.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentNewComponent } from './student-new/student-new.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsComponent } from './students.component';
import { StudentsRoutingModule } from './students.routes';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsFormComponent,
    ParentsFormComponent,
    StudentNewComponent,
    StudentEditComponent,
    StudentDetailsComponent,
    BalanceComponent,
    GuardiansFormComponent,
    MedicalInfoComponent,
    PaymentsFormComponent,
    ChargesFormComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    CustomComponentsModule,
    TranslateModule.forChild(),
    NgbModule,
    FormsModule,
    NgbModalModule,
    NgbTabsetModule,
    ReactiveFormsModule
  ]
})
export class StudentsModule {}

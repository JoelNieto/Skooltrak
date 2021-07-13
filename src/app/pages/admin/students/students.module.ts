import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import {
  CustomDatePickerModule,
  CustomSelectModule,
  CustomTableModule,
  LoadingModalModule,
} from '@skooltrak/custom-components';

import { ArchiveGradesComponent } from './archive-grades/archive-grades.component';
import { BalanceComponent } from './balance/balance.component';
import { ChargesFormComponent } from './charges-form/charges-form.component';
import { GradePeriodComponent } from './grade-period/grade-period.component';
import { GradesDetailsComponent } from './grades-details/grades-details.component';
import { GradesComponent } from './grades/grades.component';
import { GuardiansFormComponent } from './guardians-form/guardians-form.component';
import { InactiveComponent } from './inactive/inactive.component';
import { MedicalInfoComponent } from './medical-info/medical-info.component';
import { ParentsFormComponent } from './parents-form/parents-form.component';
import { PaymentsFormComponent } from './payments-form/payments-form.component';
import { PaymentsComponent } from './payments/payments.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentNewComponent } from './student-new/student-new.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsComponent } from './students.component';
import { StudentsRoutingModule } from './students.routes';
import { TemporaryComponent } from './temporary/temporary.component';

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
    PaymentsComponent,
    TemporaryComponent,
    GradesComponent,
    GradesDetailsComponent,
    GradePeriodComponent,
    InactiveComponent,
    ArchiveGradesComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    CustomTableModule,
    CustomSelectModule,
    CustomDatePickerModule,
    LoadingModalModule,
    TranslocoModule,
    NgbNavModule,
    FormsModule,
    NgbModalModule,
    ReactiveFormsModule,
  ],
})
export class StudentsModule {}

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { BalanceComponent } from '../balance/balance.component';
import { GuardiansFormComponent } from '../guardians-form/guardians-form.component';
import { ParentsFormComponent } from '../parents-form/parents-form.component';
import { StudentEditComponent } from '../student-edit/student-edit.component';
import { StudentsFormComponent } from '../students-form/students-form.component';
import { StudentDetailsComponent } from './student-details.component';

describe('StudentDetailsComponent', () => {
  let component: StudentDetailsComponent;
  let fixture: ComponentFixture<StudentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudentDetailsComponent,
        BalanceComponent,
        StudentEditComponent,
        ParentsFormComponent,
        StudentsFormComponent,
        GuardiansFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        NgbModule,
        ReactiveFormsModule,
        CustomComponentsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

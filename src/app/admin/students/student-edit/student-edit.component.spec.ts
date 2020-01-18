import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { ParentsFormComponent } from '../parents-form/parents-form.component';
import { StudentsFormComponent } from '../students-form/students-form.component';
import { StudentEditComponent } from './student-edit.component';

describe('StudentEditComponent', () => {
  let component: StudentEditComponent;
  let fixture: ComponentFixture<StudentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudentEditComponent,
        StudentsFormComponent,
        ParentsFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        NgbModule,
        FormsModule,
        CustomComponentsModule,
        ReactiveFormsModule
      ],
      providers: [DatePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

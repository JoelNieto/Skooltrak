import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'custom-components';

import { ParentsFormComponent } from '../parents-form/parents-form.component';
import { StudentsFormComponent } from '../students-form/students-form.component';
import { StudentNewComponent } from './student-new.component';

describe('StudentNewComponent', () => {
  let component: StudentNewComponent;
  let fixture: ComponentFixture<StudentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudentNewComponent,
        StudentsFormComponent,
        ParentsFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        NgbModule,
        CustomComponentsModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'custom-components';

import { ContactFormComponent } from '../contact-form/contact-form.component';
import { SchoolsFormComponent } from '../schools-form/schools-form.component';
import { SchoolsEditComponent } from './schools-edit.component';

describe('SchoolsEditComponent', () => {
  let component: SchoolsEditComponent;
  let fixture: ComponentFixture<SchoolsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SchoolsEditComponent,
        SchoolsFormComponent,
        ContactFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CustomComponentsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

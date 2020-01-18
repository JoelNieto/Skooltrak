import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ContactFormComponent } from '../contact-form/contact-form.component';
import { SchoolsFormComponent } from '../schools-form/schools-form.component';
import { SchoolsNewComponent } from './schools-new.component';

describe('SchoolsNewComponent', () => {
  let component: SchoolsNewComponent;
  let fixture: ComponentFixture<SchoolsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SchoolsNewComponent,
        SchoolsFormComponent,
        ContactFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

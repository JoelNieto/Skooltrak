import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { ContactFormComponent } from '../contact-form/contact-form.component';
import { SchoolsFormComponent } from './schools-form.component';

describe('SchoolsFormComponent', () => {
  let component: SchoolsFormComponent;
  let fixture: ComponentFixture<SchoolsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolsFormComponent, ContactFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslocoTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

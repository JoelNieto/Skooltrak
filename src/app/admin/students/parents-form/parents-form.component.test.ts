import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { ParentsFormComponent } from './parents-form.component';

describe('ParentsFormComponent', () => {
  let component: ParentsFormComponent;
  let fixture: ComponentFixture<ParentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentsFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslocoTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      nationality: new FormControl(),
      address: new FormControl(),
      workAddress: new FormControl(),
      documentId: new FormControl(),
      mobileNumber: new FormControl()
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

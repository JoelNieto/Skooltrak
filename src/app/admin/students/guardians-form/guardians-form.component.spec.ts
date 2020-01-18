import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { GuardiansFormComponent } from './guardians-form.component';

describe('GuardiansFormComponent', () => {
  let component: GuardiansFormComponent;
  let fixture: ComponentFixture<GuardiansFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuardiansFormComponent],
      imports: [FormsModule, ReactiveFormsModule, TranslateModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiansFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      mobileNumber: new FormControl()
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

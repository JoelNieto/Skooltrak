import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { MedicalInfoComponent } from './medical-info.component';
import { TranslocoModule } from '@ngneat/transloco';

describe('MedicalInfoComponent', () => {
  let component: MedicalInfoComponent;
  let fixture: ComponentFixture<MedicalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalInfoComponent ],
      imports: [ FormsModule, ReactiveFormsModule, TranslocoModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalInfoComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      bloodGroup: new FormControl(),
      medicine: new FormControl(),
      allergies: new FormControl(),
      pediatrician: new FormControl(),
      hospital: new FormControl()
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

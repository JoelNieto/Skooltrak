import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInfoComponent } from './medical-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('MedicalInfoComponent', () => {
  let component: MedicalInfoComponent;
  let fixture: ComponentFixture<MedicalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalInfoComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

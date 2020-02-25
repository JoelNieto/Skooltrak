import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CustomComponentsModule } from 'projects/custom-components/src/public-api';

import { GuardiansFormComponent } from '../guardians-form/guardians-form.component';
import { MedicalInfoComponent } from '../medical-info/medical-info.component';
import { ParentsFormComponent } from '../parents-form/parents-form.component';
import { StudentsFormComponent } from './students-form.component';

describe('StudentsFormComponent', () => {
  let component: StudentsFormComponent;
  let fixture: ComponentFixture<StudentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudentsFormComponent,
        ParentsFormComponent,
        GuardiansFormComponent,
        MedicalInfoComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslocoTestingModule,
        CustomComponentsModule,
        HttpClientTestingModule,
        NgbModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

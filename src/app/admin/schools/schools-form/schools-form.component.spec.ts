import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SchoolsFormComponent } from './schools-form.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SchoolsFormComponent', () => {
  let component: SchoolsFormComponent;
  let fixture: ComponentFixture<SchoolsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolsFormComponent ],
      imports: [ FormsModule, ReactiveFormsModule, TranslateModule.forRoot() ]
    })
    .compileComponents();
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

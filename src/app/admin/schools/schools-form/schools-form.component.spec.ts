import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsFormComponent } from './schools-form.component';

describe('SchoolsFormComponent', () => {
  let component: SchoolsFormComponent;
  let fixture: ComponentFixture<SchoolsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolsFormComponent ]
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

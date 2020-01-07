import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollCostsComponent } from './enroll-costs.component';

describe('EnrollCostsComponent', () => {
  let component: EnrollCostsComponent;
  let fixture: ComponentFixture<EnrollCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

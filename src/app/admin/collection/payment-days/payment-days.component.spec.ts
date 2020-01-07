import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDaysComponent } from './payment-days.component';

describe('PaymentDaysComponent', () => {
  let component: PaymentDaysComponent;
  let fixture: ComponentFixture<PaymentDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { PaymentFormsComponent } from './payment-forms.component';

describe('PaymentFormsComponent', () => {
  let component: PaymentFormsComponent;
  let fixture: ComponentFixture<PaymentFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentFormsComponent],
      imports: [
        TranslocoTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModalModule
      ],
      providers: [NgbActiveModal]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';

import { CollectionComponent } from './collection.component';
import { EnrollCostsComponent } from './enroll-costs/enroll-costs.component';
import { PaymentDaysComponent } from './payment-days/payment-days.component';
import { PaymentsComponent } from './payments/payments.component';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollectionComponent,
        PaymentsComponent,
        EnrollCostsComponent,
        PaymentDaysComponent
      ],
      imports: [
        TranslocoTestingModule,
        NgbModule,
        FormsModule,
        HttpClientTestingModule,
        CalendarModule,
        CustomComponentsModule
      ],
      providers: [ DatePipe, CurrencyPipe ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

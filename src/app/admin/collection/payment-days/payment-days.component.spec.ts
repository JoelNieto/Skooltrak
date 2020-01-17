import { registerLocaleData } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import localeEs from '@angular/common/locales/es-PA';
import { LOCALE_ID } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarDateFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { CustomComponentsModule } from 'custom-components';

import { PaymentDaysComponent } from './payment-days.component';

registerLocaleData(localeEs);
describe('PaymentDaysComponent', () => {
  let component: PaymentDaysComponent;
  let fixture: ComponentFixture<PaymentDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentDaysComponent],
      imports: [
        CalendarModule,
        TranslateModule.forRoot(),
        CustomComponentsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        CalendarDateFormatter,
        DateAdapter,
        { provide: LOCALE_ID, useValue: 'es-PA' }
      ]
    }).compileComponents();
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

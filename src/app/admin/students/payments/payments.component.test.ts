import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { SessionMock } from 'src/app/shared/mocks/session.mock';
import { StudentsMock } from 'src/app/shared/mocks/student.mock';
import { SessionService } from 'src/app/shared/services/session.service';

import { PaymentsComponent } from './payments.component';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslocoTestingModule, CustomComponentsModule, HttpClientTestingModule ],
      declarations: [ PaymentsComponent ],
      providers: [ DatePipe, { provide: SessionService, useClass: SessionMock } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    component.student = StudentsMock.sample;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

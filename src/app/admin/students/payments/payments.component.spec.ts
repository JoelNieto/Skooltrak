import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsComponent } from './payments.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { SessionService } from 'src/app/shared/services/session.service';
import { SessionMock } from 'src/app/shared/mocks/session.mock';
import { StudentsMock } from 'src/app/shared/mocks/student.mock';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), CustomComponentsModule, HttpClientTestingModule ],
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

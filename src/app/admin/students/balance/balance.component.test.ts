import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { StudentsMock } from 'src/app/shared/mocks/student.mock';

import { BalanceComponent } from './balance.component';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceComponent],
      imports: [TranslocoTestingModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    component.student = StudentsMock.sample;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { PaymentsFormComponent } from './payments-form.component';

describe('PaymentsFormComponent', () => {
  let component: PaymentsFormComponent;
  let fixture: ComponentFixture<PaymentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModalModule,
        FormsModule,
        ReactiveFormsModule,
        TranslocoTestingModule,
        CustomComponentsModule
      ],
      declarations: [PaymentsFormComponent],

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


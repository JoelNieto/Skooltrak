import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'custom-components';

import { EnrollCostsComponent } from './enroll-costs.component';

describe('EnrollCostsComponent', () => {
  let component: EnrollCostsComponent;
  let fixture: ComponentFixture<EnrollCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollCostsComponent],
      imports: [
        CustomComponentsModule,
        TranslateModule.forRoot(),
        FormsModule,
        HttpClientModule
      ]
    }).compileComponents();
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

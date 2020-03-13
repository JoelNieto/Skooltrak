import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { DegreesComponent } from './degrees.component';

describe('DegreesComponent', () => {
  let component: DegreesComponent;
  let fixture: ComponentFixture<DegreesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DegreesComponent],
      imports: [
        CustomComponentsModule,
        TranslocoTestingModule,
        HttpClientTestingModule
      ],
      providers: [DatePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

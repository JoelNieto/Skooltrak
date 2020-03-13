import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { TeachersComponent } from './teachers.component';

describe('TeachersComponent', () => {
  let component: TeachersComponent;
  let fixture: ComponentFixture<TeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeachersComponent],
      imports: [
        CustomComponentsModule,
        TranslocoTestingModule,
        HttpClientTestingModule
      ],
      providers: [DatePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

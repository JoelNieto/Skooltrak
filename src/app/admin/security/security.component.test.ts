import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { SecurityComponent } from './security.component';

describe('SecurityComponent', () => {
  let component: SecurityComponent;
  let fixture: ComponentFixture<SecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityComponent],
      imports: [TranslocoTestingModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

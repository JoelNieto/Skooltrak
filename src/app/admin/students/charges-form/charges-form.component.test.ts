import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesFormComponent } from './charges-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { TranslocoTestingModule } from '@ngneat/transloco';

describe('ChargesFormComponent', () => {
  let component: ChargesFormComponent;
  let fixture: ComponentFixture<ChargesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, CustomComponentsModule, TranslocoTestingModule ],
      declarations: [ ChargesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

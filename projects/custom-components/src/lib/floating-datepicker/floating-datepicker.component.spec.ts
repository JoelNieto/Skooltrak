import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingDatepickerComponent } from './floating-datepicker.component';

describe('FloatingDatepickerComponent', () => {
  let component: FloatingDatepickerComponent;
  let fixture: ComponentFixture<FloatingDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

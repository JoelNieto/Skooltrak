import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedGradesComponent } from './closed-grades.component';

describe('ClosedGradesComponent', () => {
  let component: ClosedGradesComponent;
  let fixture: ComponentFixture<ClosedGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

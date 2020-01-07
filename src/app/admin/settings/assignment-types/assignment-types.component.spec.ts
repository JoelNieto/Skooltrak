import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTypesComponent } from './assignment-types.component';

describe('AssignmentTypesComponent', () => {
  let component: AssignmentTypesComponent;
  let fixture: ComponentFixture<AssignmentTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

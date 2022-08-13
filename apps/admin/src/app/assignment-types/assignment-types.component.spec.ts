import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTypesComponent } from './assignment-types.component';

describe('AssignmentTypesComponent', () => {
  let component: AssignmentTypesComponent;
  let fixture: ComponentFixture<AssignmentTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AssignmentTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

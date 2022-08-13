import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTypesFormComponent } from './assignment-types-form.component';

describe('AssignmentTypesFormComponent', () => {
  let component: AssignmentTypesFormComponent;
  let fixture: ComponentFixture<AssignmentTypesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentTypesFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

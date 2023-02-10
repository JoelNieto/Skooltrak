import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAssignmentsComponent } from './courses-assignments.component';

describe('CoursesAssignmentsComponent', () => {
  let component: CoursesAssignmentsComponent;
  let fixture: ComponentFixture<CoursesAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CoursesAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

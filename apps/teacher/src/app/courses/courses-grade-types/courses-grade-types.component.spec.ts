import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesGradeTypesComponent } from './courses-grade-types.component';

describe('CoursesGradeTypesComponent', () => {
  let component: CoursesGradeTypesComponent;
  let fixture: ComponentFixture<CoursesGradeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CoursesGradeTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesGradeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

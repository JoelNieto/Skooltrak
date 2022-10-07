import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesGradesComponent } from './courses-grades.component';

describe('CoursesGradesComponent', () => {
  let component: CoursesGradesComponent;
  let fixture: ComponentFixture<CoursesGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CoursesGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

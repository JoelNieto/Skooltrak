import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CourseMock } from 'src/app/shared/mocks/course.mock';

import { CourseGradesComponent } from './course-grades.component';

describe('CourseGradesComponent', () => {
  let component: CourseGradesComponent;
  let fixture: ComponentFixture<CourseGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslocoTestingModule],
      declarations: [ CourseGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGradesComponent);
    component = fixture.componentInstance;
    component.course = CourseMock.sample;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

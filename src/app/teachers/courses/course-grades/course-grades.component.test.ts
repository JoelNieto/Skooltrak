import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CourseMock } from 'src/app/shared/mocks/course.mock';

import { CourseGradesComponent } from './course-grades.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

describe('CourseGradesComponent', () => {
  let component: CourseGradesComponent;
  let fixture: ComponentFixture<CourseGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslocoTestingModule, CustomComponentsModule, NgbNavModule ],
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

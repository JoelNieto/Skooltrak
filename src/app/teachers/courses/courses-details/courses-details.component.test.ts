import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { CourseGradesComponent } from '../course-grades/course-grades.component';
import { CourseScheduleComponent } from '../course-schedule/course-schedule.component';
import { CoursesDocumentsComponent } from '../courses-documents/courses-documents.component';
import { CoursesMessagesComponent } from '../courses-messages/courses-messages.component';
import { ForumsComponent } from '../forums/forums.component';
import { CoursesDetailsComponent } from './courses-details.component';
import { CustomComponentsModule } from '@skooltrak/custom-components';

describe('CoursesDetailsComponent', () => {
  let component: CoursesDetailsComponent;
  let fixture: ComponentFixture<CoursesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbNavModule, TranslocoTestingModule, FormsModule, CustomComponentsModule],
      declarations: [
        CoursesDetailsComponent,
        CourseGradesComponent,
        CourseScheduleComponent,
        CoursesMessagesComponent,
        CoursesDocumentsComponent,
        ForumsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

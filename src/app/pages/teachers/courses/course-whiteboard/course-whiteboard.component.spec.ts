import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWhiteboardComponent } from './course-whiteboard.component';

describe('CourseWhiteboardComponent', () => {
  let component: CourseWhiteboardComponent;
  let fixture: ComponentFixture<CourseWhiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseWhiteboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

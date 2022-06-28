import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoursesVideosComponent } from './courses-videos.component';

describe('CoursesVideosComponent', () => {
  let component: CoursesVideosComponent;
  let fixture: ComponentFixture<CoursesVideosComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CoursesVideosComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

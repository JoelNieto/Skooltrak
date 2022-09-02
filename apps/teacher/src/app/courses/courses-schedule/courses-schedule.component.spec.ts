import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesScheduleComponent } from './courses-schedule.component';

describe('CoursesScheduleComponent', () => {
  let component: CoursesScheduleComponent;
  let fixture: ComponentFixture<CoursesScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CoursesScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

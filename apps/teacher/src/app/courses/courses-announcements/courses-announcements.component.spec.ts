import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAnnouncementsComponent } from './courses-announcements.component';

describe('CoursesAnnouncementsComponent', () => {
  let component: CoursesAnnouncementsComponent;
  let fixture: ComponentFixture<CoursesAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CoursesAnnouncementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

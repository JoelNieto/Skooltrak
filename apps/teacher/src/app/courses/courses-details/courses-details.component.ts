import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { teacher_courses } from '@skooltrak-app/state';

import { CoursesAnnouncementsComponent } from '../courses-announcements/courses-announcements.component';
import { CoursesScheduleComponent } from '../courses-schedule/courses-schedule.component';

@Component({
  selector: 'skooltrak-courses-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    TranslateModule,
    CoursesAnnouncementsComponent,
    CoursesScheduleComponent,
  ],
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesDetailsComponent implements OnInit {
  courses$ = this.state.allCourses$;
  selected$ = this.state.selectedCourse$;
  constructor(
    private state: teacher_courses.CoursesFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: ({ id }) => this.state.setCourse(id),
    });
  }
}

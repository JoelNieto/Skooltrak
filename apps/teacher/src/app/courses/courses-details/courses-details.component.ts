import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { teacher_courses } from '@skooltrak-app/state';

import { CoursesAnnouncementsComponent } from '../courses-announcements/courses-announcements.component';
import { CoursesGradeTypesComponent } from '../courses-grade-types/courses-grade-types.component';
import { CoursesGradesComponent } from '../courses-grades/courses-grades.component';
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
    MatProgressBarModule,
    LetModule,
    TranslateModule,
    CoursesGradesComponent,
    CoursesGradeTypesComponent,
    CoursesAnnouncementsComponent,
    CoursesScheduleComponent,
  ],
  template: `
    <mat-card>
      <ng-template #loading>
        <mat-progress-bar mode="query"></mat-progress-bar>
      </ng-template>

      <mat-card-header *ngrxLet="selected$ as course; suspenseTpl: loading">
        <mat-card-title
          >{{ 'Course' | translate }}:
          {{ course?.subject?.name }}</mat-card-title
        >
        <mat-card-subtitle>{{ course?.plan?.name }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <mat-tab-group mat-stretch-tabs="false" [dynamicHeight]>
          <mat-tab [label]="'Schedule' | translate">
            <skooltrak-courses-schedule/>
          </mat-tab>
          <mat-tab [label]="'Grades' | translate">
            <skooltrak-courses-grades/>
          </mat-tab>
          <mat-tab [label]="'Announcements' | translate">
            <skooltrak-courses-announcements/>
          </mat-tab>
          <mat-tab [label]="'Content' | translate"> </mat-tab>
          <mat-tab [label]="'Grade distribution' | translate">
            <skooltrak-courses-grade-types/>
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesDetailsComponent implements OnInit {
  private state = inject(teacher_courses.CoursesFacade);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  courses$ = this.state.allCourses$;
  selected$ = this.state.selectedCourse$;

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: ({ id }) => this.state.setCourse(id),
    });

    this.state.selectedCourse$.subscribe({
      next: (course) => {
        !!course &&
          this.title.setTitle(
            `${this.title.getTitle()} | ${course.subject.shortName}`
          );
      },
    });
  }
}

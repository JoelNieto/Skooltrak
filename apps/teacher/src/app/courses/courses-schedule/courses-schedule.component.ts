import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { teacher_courses } from '@skooltrak-app/state';
import { AssignmentFormComponent, CalendarComponent } from '@skooltrak-app/ui';
import { Subscription } from 'rxjs';

@Component({
  selector: 'skooltrak-courses-schedule',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent,
    AssignmentFormComponent,
    MatDialogModule,
  ],
  templateUrl: './courses-schedule.component.html',
  styleUrls: ['./courses-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesScheduleComponent {
  subscription = new Subscription();
  constructor(
    private readonly dialog: MatDialog,
    private readonly state: teacher_courses.CoursesFacade
  ) {}

  newAssignment(): void {
    this.subscription.add(
      this.state.selectedCourse$.subscribe({
        next: (course) => {
          this.dialog.open(AssignmentFormComponent, {
            panelClass: ['dialog', 'medium'],
            data: {
              course,
            },
          });
        },
      })
    );
  }
}

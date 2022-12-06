import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Assignment } from '@skooltrak-app/models';
import { teacher_courses } from '@skooltrak-app/state';
import { AssignmentFormComponent, CalendarComponent } from '@skooltrak-app/ui';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'skooltrak-courses-schedule',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent,
    AssignmentFormComponent,
    MatDialogModule,
  ],
  template: `
    <skooltrak-calendar
      context="course"
      [contextId]="id$ | async"
      (newAction)="newAssignment()"
      (selectAction)="editAssignment($event)"
      [canDelete]="true"
    ></skooltrak-calendar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesScheduleComponent implements OnDestroy {
  subscription = new Subscription();
  id$ = this.state.selectedCourseId$;
  @ViewChild(CalendarComponent) calendar!: CalendarComponent;

  constructor(
    private readonly dialog: MatDialog,
    private readonly state: teacher_courses.CoursesFacade
  ) {}

  newAssignment(): void {
    this.subscription.add(
      this.state.selectedCourse$
        .pipe(
          switchMap((course) => {
            {
              const dialogRef = this.dialog.open(AssignmentFormComponent, {
                panelClass: ['dialog', 'x-large'],
                data: {
                  course,
                },
              });
              return dialogRef.afterClosed();
            }
          })
        )
        .subscribe({
          next: () => {
            this.calendar.fetchEvents();
          },
        })
    );
  }

  editAssignment(assignment: Assignment) {
    const dialogRef = this.dialog.open(AssignmentFormComponent, {
      panelClass: ['dialog', 'x-large'],
      data: {
        current: assignment,
      },
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe({
        next: () => {
          this.calendar.fetchEvents();
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

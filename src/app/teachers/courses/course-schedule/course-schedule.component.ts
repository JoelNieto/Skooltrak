import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/shared/models/assignments.model';
import { TranslocoService } from '@ngneat/transloco';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from 'src/app/shared/services/session.service';
import { map } from 'rxjs/operators';
import { add, isSameMonth, isSameDay } from 'date-fns';

@Component({
  selector: 'app-course-schedule',
  templateUrl: './course-schedule.component.html',
  styleUrls: ['./course-schedule.component.sass']
})
export class CourseScheduleComponent implements OnInit {
  @Input() course: Course;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();
  assignment$: Observable<CalendarEvent<{ assignment: Assignment }>[]>;
  activeDayIsOpen = false;

  constructor(
    private courseService: CoursesService,
    private transloco: TranslocoService,
    public modal: NgbModal,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.assignment$ = this.courseService.getAssignments(this.course.id).pipe(
      map(res => {
        return res.map(assignment => {
          return {
            id: assignment.id,
            title: assignment.title,
            start: add(new Date(assignment.startDate), { hours: 6 }),
            end: add(new Date(assignment.dueDate), { hours: 12 }),
            meta: {
              assignment
            }
          };
        });
      })
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: CalendarEvent<{ assignment: Assignment }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
}

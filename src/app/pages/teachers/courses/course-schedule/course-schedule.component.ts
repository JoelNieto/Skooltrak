import { WeekDay } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  add,
  addDays,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfWeek,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssignmentFormComponent } from 'src/app/shared/components/assignment-form/assignment-form.component';
import {
  Assignment,
  AssignmentsDay,
} from 'src/app/shared/models/assignments.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-course-schedule',
  templateUrl: './course-schedule.component.html',
  styleUrls: ['./course-schedule.component.sass'],
})
export class CourseScheduleComponent implements OnInit {
  @Input() course: Course;

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  isLoading = false;

  viewDate: Date = new Date();
  assignment$: Observable<CalendarEvent<{ assignment: Assignment }>[]>;
  assignments$: Observable<Assignment[]>;
  activeDayIsOpen = false;
  mapped: AssignmentsDay[];
  weekStart: Date;
  weekEnd: Date;

  constructor(
    private courseService: CoursesService,
    private assignmentService: AssignmentService,
    private transloco: TranslocoService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    this.weekEnd = addDays(this.weekStart, 6);
    this.fetchEvents();
  }

  createAssignment() {
    const modalRef = this.modal.open(AssignmentFormComponent, { size: 'lg' });
    modalRef.result.then((res: Assignment) => {
      this.assignmentService.create(res).subscribe(
        (resp) => {
          Swal.fire(
            resp.title,
            this.transloco.translate('Created item', {
              value: this.transloco.translate('Assignment'),
            }),
            'success'
          );
          this.fetchEvents();
        },
        (err: Error) => {
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate(err.message),
            'error'
          );
        }
      );
    });
    modalRef.componentInstance.course = this.course;
  }

  fetchEvents(): void {
    this.assignments$ = this.courseService.getAssignments(this.course.id);
    this.mapWeek();
    this.assignment$ = this.assignments$.pipe(
      map((res) =>
        res.map((assignment) => ({
          id: assignment.id,
          title: assignment.title,
          allDay: true,
          start: add(new Date(assignment.startDate), { hours: 6 }),
          end: add(new Date(assignment.dueDate), { hours: 12 }),
          meta: {
            assignment,
          },
        }))
      )
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  mapWeek() {
    this.isLoading = true;
    this.weekStart = startOfWeek(this.viewDate, {
      weekStartsOn: WeekDay.Monday,
    });
    this.weekEnd = endOfWeek(this.viewDate, { weekStartsOn: WeekDay.Monday });
    this.assignments$.subscribe(
      (res) => {
        this.mapped = this.assignmentService.mapAssignments(
          this.weekStart,
          this.weekEnd,
          res
        );
        this.isLoading = false;
      },
      (err) => console.error(err)
    );
  }

  closeOpenMonthViewDay() {
    this.mapWeek();
    this.activeDayIsOpen = false;
  }

  formatDate(date: Date) {
    return format(date, 'iiii d', { locale: es });
  }

  dayClicked({
    date,
    events,
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

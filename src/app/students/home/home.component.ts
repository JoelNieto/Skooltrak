import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { Observable } from 'rxjs';
import { Assignment, AssignmentsDay } from 'src/app/shared/models/assignments.model';
import { StudentsService } from 'src/app/shared/services/students.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { SessionService } from 'src/app/shared/services/session.service';
import { map } from 'rxjs/operators';
import { add, isSameMonth, isSameDay, startOfWeek, addDays, endOfWeek, format } from 'date-fns';
import { AssignmentDetailsComponent } from 'src/app/shared/components/assignment-details/assignment-details.component';
import { WeekDay } from '@angular/common';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();
  assignment$: Observable<CalendarEvent<{ assignment: Assignment }>[]>;
  activeDayIsOpen = false;
  assignments: Observable<Assignment[]>;
  isLoading = false;
  mapped: AssignmentsDay[];
  selected: Assignment;
  excludeDays: number[] = [0, 6];
  weekStart: Date;
  weekEnd: Date;

  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  constructor(
    private studentsService: StudentsService,
    private modal: NgbModal,
    private assignmentService: AssignmentService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    this.weekEnd = addDays(this.weekStart, 6);
  }

  mapWeek() {
    this.isLoading = true;
    this.weekStart = startOfWeek(this.viewDate, {
      weekStartsOn: WeekDay.Monday
    });
    this.weekEnd = endOfWeek(this.viewDate, { weekStartsOn: WeekDay.Monday });
    this.assignments.subscribe(res => {
      this.mapped = this.assignmentService.mapAssignments(
        this.weekStart,
        this.weekEnd,
        res
      );
      this.isLoading = false;
    });
  }

  fetchEvents(): void {
    this.assignments = this.studentsService.getAssignments(this.session.currentUser.people[0].id);
    this.mapWeek();
    this.assignment$ = this.studentsService.getAssignments(this.session.currentUser.people[0].id)
    .pipe(
      map(res => {
        return res.map(assignment => {
          return {
            id: assignment.id,
            title: assignment.title,
            allDay: true,
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

  setView(view: CalendarView) {
    this.view = view;
  }

  formatDate(date: Date) {
    return format(date, 'iiii d', { locale: es });
  }

  closeOpenMonthViewDay() {
    this.mapWeek();
    this.activeDayIsOpen = false;
  }

  selectDay(event: CalendarEvent) {
    const modalRef = this.modal.open(AssignmentDetailsComponent, {size: 'lg' });
    modalRef.result.then(() => {}, reasons => {});
    modalRef.componentInstance.assignment = event.meta.assignment;
  }
}

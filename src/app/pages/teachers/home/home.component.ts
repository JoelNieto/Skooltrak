import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { WeekDay } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
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
import { Activity } from 'src/app/shared/models/activities.model';
import {
  Assignment,
  AssignmentsDay,
} from 'src/app/shared/models/assignments.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        query('.card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(30, animate('500ms cubic-bezier(0.23, 1, 0.32, 1)')),
        ]),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  assignments: Observable<Assignment[]>;
  isLoading = false;
  mapped: AssignmentsDay[];
  viewDate: Date = new Date();
  assignment$: Observable<CalendarEvent<{ assignment: Assignment }>[]>;
  activeDayIsOpen = false;
  selected: Assignment;
  excludeDays: number[] = [0, 6];
  activities: Observable<Activity[]>;

  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  weekStart: Date;
  weekEnd: Date;

  constructor(
    private teachersService: TeachersService,
    private assignmentService: AssignmentService,
    public modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslocoService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.fetchEvents();
    this.activities = this.teachersService.getActivities(
      this.session.currentUser.people[0].id
    );
    this.weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    this.weekEnd = addDays(this.weekStart, 6);
  }

  fetchEvents() {
    this.assignments = this.teachersService.getAssignments(
      this.session.currentUser.people[0].id
    );
    this.mapWeek();
    this.assignment$ = this.teachersService
      .getAssignments(this.session.currentUser.people[0].id)
      .pipe(
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

  mapWeek() {
    this.isLoading = true;
    this.weekStart = startOfWeek(this.viewDate, {
      weekStartsOn: WeekDay.Monday,
    });
    this.weekEnd = endOfWeek(this.viewDate, { weekStartsOn: WeekDay.Monday });
    this.assignments.subscribe((res) => {
      this.mapped = this.assignmentService.mapAssignments(
        this.weekStart,
        this.weekEnd,
        res
      );
      this.isLoading = false;
    });
  }

  formatDate(date: Date) {
    return format(date, 'iiii d', { locale: es });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.mapWeek();
    this.activeDayIsOpen = false;
  }

  selectDay(event: CalendarEvent) {
    this.router.navigate(['assignments', event.meta.assignment.id], {
      relativeTo: this.route.parent,
    });
  }

  createAssignment() {
    const modalRef = this.modal.open(AssignmentFormComponent, { size: 'xl' });
    modalRef.result.then(
      (res) => {
        this.assignmentService.create(res).subscribe(
          (resp) => {
            Swal.fire(
              res.title,
              this.translate.translate('Created item', {
                value: this.translate.translate('Assignment'),
              }),
              'success'
            );
            this.fetchEvents();
          },
          (err: Error) => {
            Swal.fire(
              this.translate.translate('Something went wrong'),
              this.translate.translate(err.message),
              'error'
            );
          }
        );
      },
      (reasons) => {}
    );
  }

  showModal(): void {
    this.modal.open(AssignmentFormComponent, { size: 'lg' });
  }
}

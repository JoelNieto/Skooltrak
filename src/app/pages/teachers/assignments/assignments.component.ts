import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { WeekDay } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
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
import {
  Assignment,
  AssignmentsDay,
} from 'src/app/shared/models/assignments.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.sass'],
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
export class AssignmentsComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  assignments$: Observable<Assignment[]>;
  isLoading = false;
  mapped: AssignmentsDay[];
  viewDate: Date = new Date();
  assignment$: Observable<CalendarEvent<{ assignment: Assignment }>[]>;
  activeDayIsOpen = false;
  selected: Assignment;
  excludeDays: number[] = [0, 6];

  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  weekStart: Date;
  weekEnd: Date;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private transloco: TranslocoService,
    private session: SessionService,
    private teachersService: TeachersService,
    private assignmentsService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    this.weekEnd = addDays(this.weekStart, 6);
  }

  fetchEvents() {
    this.assignments$ = this.teachersService.getAssignments(
      this.session.currentUser.people[0].id
    );
    this.mapWeek();
    this.assignment$ = this.teachersService
      .getAssignments(this.session.currentUser.people[0].id)
      .pipe(
        map((res) =>
          res.map((assignment) => ({
            id: assignment.id,
            title: `${assignment.course?.subject?.shortName} / ${assignment.group?.name} / ${assignment.title}`,
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
    this.assignments$.subscribe(
      (res) => {
        this.mapped = this.assignmentsService.mapAssignments(
          this.weekStart,
          this.weekEnd,
          res
        );
        this.isLoading = false;
      },
      (err) => console.error(err)
    );
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
    this.router.navigate([event.meta.assignment.id], {
      relativeTo: this.route,
    });
  }

  createAssignment() {
    const modalRef = this.modal.open(AssignmentFormComponent, { size: 'lg' });
    modalRef.result.then(
      (res) => {
        this.assignmentsService.create(res).subscribe(
          (resp) => {
            Swal.fire(
              res.title,
              this.transloco.translate('Created item', {
                value: this.transloco.translate('Assignment'),
              }),
              'success'
            );
            this.fetchEvents();
          },
          (err: HttpErrorResponse) => {
            if (err.status === 401) {
              Swal.fire(
                'No puede crear esta asignación',
                'Este grupo ya tiene 3 asignaciones sumativas. Favor crear una asignación no sumativa',
                'error'
              );
            } else {
              Swal.fire(
                this.transloco.translate('Something went wrong'),
                this.transloco.translate(err.message),
                'error'
              );
            }
          }
        );
      },
      (reasons) => {}
    );
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import {
  add,
  isSameDay,
  isSameMonth,
  startOfWeek,
  format,
  endOfWeek,
  addDays
} from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssignmentFormComponent } from 'src/app/shared/components/assignment-form/assignment-form.component';
import {
  Assignment,
  AssignmentsDay
} from 'src/app/shared/models/assignments.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import Swal from 'sweetalert2';
import { WeekDay } from '@angular/common';
import { es } from 'date-fns/locale';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
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

  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  weekStart: Date;
  weekEnd: Date;

  constructor(
    private teachersService: TeachersService,
    private assignmentService: AssignmentService,
    public modal: NgbModal,
    private translate: TranslocoService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.fetchEvents();
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

  selectDay(event: CalendarEvent, content: any) {
    const modalRef = this.modal.open(AssignmentFormComponent, { size: 'lg' });
    modalRef.result.then(
      (res: Assignment) => {
        this.assignmentService.edit(res.id, res).subscribe(
          () => {
            Swal.fire(
              res.title,
              this.translate.translate('Updated item', {
                value: this.translate.translate('Assignment')
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
      reasons => {}
    );
    modalRef.componentInstance.assignment = event.meta.assignment;
  }

  createAssignment() {
    const modalRef = this.modal.open(AssignmentFormComponent, { size: 'lg' });
    modalRef.result.then(
      res => {
        this.assignmentService.create(res).subscribe(
          resp => {
            Swal.fire(
              res.title,
              this.translate.translate('Created item', {
                value: this.translate.translate('Assignment')
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
      reasons => {}
    );
  }

  showModal(): void {
    this.modal.open(AssignmentFormComponent, { size: 'lg' });
  }
}

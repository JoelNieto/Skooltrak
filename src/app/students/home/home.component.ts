import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/shared/models/assignments.model';
import { StudentsService } from 'src/app/shared/services/students.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { SessionService } from 'src/app/shared/services/session.service';
import { map } from 'rxjs/operators';
import { add, isSameMonth, isSameDay } from 'date-fns';
import { AssignmentDetailsComponent } from 'src/app/shared/components/assignment-details/assignment-details.component';

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
  selected: Assignment;
  excludeDays: number[] = [0, 6];

  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  constructor(
    private studentsService: StudentsService,
    private modal: NgbModal,
    private translate: TranslocoService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
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

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  selectDay(event: CalendarEvent) {
    const modalRef = this.modal.open(AssignmentDetailsComponent, {size: 'lg' });
    modalRef.result.then(() => {}, reasons => {});
    modalRef.componentInstance.assignment = event.meta.assignment;
  }
}

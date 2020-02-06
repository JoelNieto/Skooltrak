import { Component, OnInit } from '@angular/core';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/shared/models/assignments.model';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { SessionService } from 'src/app/shared/services/session.service';
import { map } from 'rxjs/operators';
import { isSameMonth, isSameDay } from 'date-fns';

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

  constructor(
    private teachersService: TeachersService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.assignment$ = this.teachersService
      .getAssignments(this.session.currentUser.people[0].id)
      .pipe(
        map(res => {
          return res.map(assignment => {
            return {
              id: assignment.id,
              title: assignment.title,
              start: new Date(assignment.dueDate),
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

  selectDay(event: CalendarEvent, content: any) {
    this.selected = event.meta.day;
  }
}

import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import {
  add,
  addDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isSunday,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssignmentDetailsComponent } from 'src/app/shared/components/assignment-details/assignment-details.component';
import { Activity } from 'src/app/shared/models/activities.model';
import {
  Assignment,
  AssignmentsDay,
} from 'src/app/shared/models/assignments.model';
import { QuizResult } from 'src/app/shared/models/quizes.model';
import { ClassDay } from 'src/app/shared/models/studyplans.model';
import { Survey } from 'src/app/shared/models/surveys.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.sass'],
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
export class ScheduleComponent implements OnInit {
  schedule: Observable<ClassDay[]>;
  currentSurveys: Observable<Survey[]>;
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  viewDate: Date = new Date();
  quizes$: Observable<QuizResult[]>;
  assignment$: Observable<CalendarEvent<{ assignment: Assignment }>[]>;
  activeDayIsOpen = false;
  isLoading = false;
  mapped: AssignmentsDay[];
  selected: Assignment;
  excludeDays: number[] = [0, 6];
  weekStart: Date;
  weekEnd: Date;
  activities: Observable<Activity[]>;

  weekStartsOn = DAYS_OF_WEEK.SUNDAY;
  constructor(
    private assignmentService: AssignmentService,
    private session: SessionService,
    public coursesService: CoursesService,
    private studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.weekStart = startOfWeek(new Date());
    this.weekEnd = addDays(this.weekStart, 6);
    this.fetchEvents();
  }

  mapWeek() {
    this.isLoading = true;
    this.weekStart = startOfWeek(this.viewDate);
    this.weekEnd = endOfWeek(this.viewDate);
    this.assignment$.subscribe((res) => {
      this.mapped = this.assignmentService.mapAssignments(
        this.weekStart,
        this.weekEnd,
        res.map((assignment) => assignment.meta.assignment)
      );
      this.isLoading = false;
    });
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];
    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];
    this.assignment$ = this.studentsService
      .getAssignments(
        this.session.currentUser.people[0].id,
        getStart(this.viewDate),
        getEnd(this.viewDate)
      )
      .pipe(
        map((res) =>
          res.map((assignment) => ({
            id: assignment.id,
            title: assignment.title,
            allDay: true,
            start: add(new Date(assignment.startDate), {
              minutes: new Date().getTimezoneOffset(),
            }),
            end: add(new Date(assignment.dueDate), {
              minutes: new Date().getTimezoneOffset(),
            }),
            meta: {
              assignment,
            },
          }))
        )
      );
    this.mapWeek();
  }

  closeOpenMonthViewDay() {
    this.fetchEvents();
    this.mapWeek();
    this.activeDayIsOpen = false;
  }

  selectDay(event: CalendarEvent) {
    this.router.navigate(['assignments', event.meta.assignment.id], {
      relativeTo: this.route.parent,
    });
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

  formatDate(date: Date) {
    return format(date, 'iiii d', { locale: es });
  }

  hideSundays(day: AssignmentsDay) {
    return isSunday(day.date);
  }

  setView(view: CalendarView) {
    this.view = view;
    this.fetchEvents();
  }

  openDetails(assignment: Assignment) {
    const modalRef = this.modal.open(AssignmentDetailsComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.result.then((result) => {
      if (result === 'course') {
        this.router.navigate(['/student/courses', assignment.course.id]);
      } else {
        this.router.navigate(['/student/assignments', assignment.id]);
      }
    });
    modalRef.componentInstance.assignment = assignment;
  }
}

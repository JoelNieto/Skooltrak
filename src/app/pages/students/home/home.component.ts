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
  formatDistance,
  isSameDay,
  isSameMonth,
  isSunday,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { es } from 'date-fns/locale';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssignmentDetailsComponent } from 'src/app/shared/components/assignment-details/assignment-details.component';
import { SurveyFormComponent } from 'src/app/shared/components/survey-form/survey-form.component';
import { Activity } from 'src/app/shared/models/activities.model';
import {
  Assignment,
  AssignmentsDay,
} from 'src/app/shared/models/assignments.model';
import { QuizResult } from 'src/app/shared/models/quizes.model';
import { ClassDay, ClassGroup } from 'src/app/shared/models/studyplans.model';
import { Survey } from 'src/app/shared/models/surveys.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { SurveysService } from 'src/app/shared/services/surveys.service';

@Component({
  selector: 'app-home',
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
    private studentsService: StudentsService,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public coursesService: CoursesService,
    private assignmentService: AssignmentService,
    private session: SessionService,
    private surveysService: SurveysService
  ) {}

  ngOnInit(): void {
    this.currentSurveys = this.surveysService.getCurrentSurveys();
    this.quizes$ = this.studentsService.getQuizes(
      this.session.currentStudent?.id
    );
    this.schedule = this.studentsService.getSchedule(
      this.session.currentStudent?.id
    );
    this.activities = this.studentsService.getActivities(
      this.session.currentStudent?.id
    );
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
        res.map((assignment) => {
          return assignment.meta.assignment;
        })
      );
      this.isLoading = false;
    });
  }

  openDetails(assignment: Assignment) {
    const modalRef = this.modal.open(AssignmentDetailsComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.result.then((result) => {
      if (result === 'course') {
        this.router.navigate(['..', 'courses', assignment.course.id], {
          relativeTo: this.route,
        });
      } else {
        this.router.navigate(['..', 'assignments', assignment.id], {
          relativeTo: this.route,
        });
      }
    });
    modalRef.componentInstance.assignment = assignment;
  }

  public hexToRGBA(hex: string, opacity: number): string {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      // tslint:disable-next-line: no-bitwise
      return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
        ','
      )},${opacity})`;
    }
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
        map((res) => {
          return res.map((assignment) => {
            return {
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
            };
          });
        })
      );
    this.mapWeek();
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

  setView(view: CalendarView) {
    this.view = view;
    this.fetchEvents();
  }

  formatDate(date: Date) {
    return format(date, 'iiii d', { locale: es });
  }

  hideSundays(day: AssignmentsDay) {
    return isSunday(day.date);
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

  formatDue(date: Date) {
    return formatDistance(new Date(), new Date(date), {
      locale: es,
    });
  }

  public convetToPDF() {
    const data = document.getElementById('week-container');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('new-file.pdf'); // Generated PDF
    });
  }

  getValues() {
    const array: string[][] = [];
    return array;
  }

  answerSurvey(id: string) {
    const modalRef = this.modal.open(SurveyFormComponent, { size: 'lg' });
    modalRef.result.then(() => {
      this.currentSurveys = this.surveysService.getCurrentSurveys();
    });
    modalRef.componentInstance.surveyId = id;
  }
}

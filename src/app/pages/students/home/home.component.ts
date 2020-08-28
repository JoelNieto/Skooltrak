import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import {
  add,
  addDays,
  endOfWeek,
  format,
  formatDistance,
  isSameDay,
  isSameMonth,
  isSunday,
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
import { Survey } from 'src/app/shared/models/surveys.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { SurveysService } from 'src/app/shared/services/surveys.service';
import { result } from 'underscore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  currentSurveys: Observable<Survey[]>;
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  viewDate: Date = new Date();
  quizes$: Observable<QuizResult[]>;
  assignment$: Observable<CalendarEvent<{ assignment: Assignment }>[]>;
  activeDayIsOpen = false;
  assignments: Observable<Assignment[]>;
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
    private assignmentService: AssignmentService,
    private session: SessionService,
    private surveysService: SurveysService
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.currentSurveys = this.surveysService.getCurrentSurveys();
    this.quizes$ = this.studentsService.getQuizes(
      this.session.currentStudent?.id
    );
    this.activities = this.studentsService.getActivities(
      this.session.currentStudent?.id
    );
    this.weekStart = startOfWeek(new Date());
    this.weekEnd = addDays(this.weekStart, 6);
  }

  mapWeek() {
    this.isLoading = true;
    this.weekStart = startOfWeek(this.viewDate);
    this.weekEnd = endOfWeek(this.viewDate);
    this.assignments.subscribe((res) => {
      this.mapped = this.assignmentService.mapAssignments(
        this.weekStart,
        this.weekEnd,
        res
      );
      this.isLoading = false;
    });
  }

  openDetails(assignment: Assignment) {
    const modalRef = this.modal.open(AssignmentDetailsComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.result.then(() => {
      this.router.navigate(['..', 'assignments', assignment.id], {
        relativeTo: this.route,
      });
    });
    modalRef.componentInstance.assignment = assignment;
  }

  fetchEvents(): void {
    this.assignments = this.studentsService.getAssignments(
      this.session.currentUser.people[0].id
    );
    this.mapWeek();
    this.assignment$ = this.studentsService
      .getAssignments(this.session.currentUser.people[0].id)
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
  }

  formatDate(date: Date) {
    return format(date, 'iiii d', { locale: es });
  }

  hideSundays(day: AssignmentsDay) {
    return isSunday(day.date);
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

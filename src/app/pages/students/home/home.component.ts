import { WeekDay } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { add, addDays, endOfWeek, format, isSameDay, isSameMonth, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssignmentDetailsComponent } from 'src/app/shared/components/assignment-details/assignment-details.component';
import { Assignment, AssignmentsDay } from 'src/app/shared/models/assignments.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { FilesService } from 'src/app/shared/services/files.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { Activity } from 'src/app/shared/models/activities.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  view: CalendarView = CalendarView.Week;
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
  activities: Observable<Activity[]>;

  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  constructor(
    private studentsService: StudentsService,
    private modal: NgbModal,
    private assignmentService: AssignmentService,
    private session: SessionService,
    private filesServ: FilesService
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.activities = this.studentsService.getActivities(this.session.currentStudent?.id);
    this.weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    this.weekEnd = addDays(this.weekStart, 6);
    console.log(this.session.currentStudent);
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
    this.assignments = this.studentsService.getAssignments(
      this.session.currentUser.people[0].id
    );
    this.mapWeek();
    this.assignment$ = this.studentsService
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
    const modalRef = this.modal.open(AssignmentDetailsComponent, {
      size: 'lg'
    });
    modalRef.result.then(
      () => {},
      reasons => {}
    );
    modalRef.componentInstance.assignment = event.meta.assignment;
  }

  public convetToPDF() {
    const data = document.getElementById('week-container');
    html2canvas(data).then(canvas => {
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
}

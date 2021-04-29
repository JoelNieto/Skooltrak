import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Table, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
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
import { FilesService } from 'src/app/shared/services/files.service';
import { SchoolsService } from 'src/app/shared/services/schools.service';
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
    private schoolsService: SchoolsService,
    private filesServ: FilesService,
    private sanitizer: DomSanitizer,
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

  async printWeek() {
    const doc = await this.generatePDF();
    pdfMake
      .createPdf(
        doc,
        {},
        {
          // Default font should still be available
          Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-Italic.ttf',
          },
          // Make sure you define all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)
          TimesNewRoman: {
            normal: 'Times-New-Roman-Regular.ttf',
            bold: 'Times-New-Roman-Bold.ttf',
            italics: 'Times-New-Roman-Italics.ttf',
            bolditalics: 'Times-New-Roman-Italics.ttf',
          },
        },
        pdfFonts.pdfMake.vfs
      )
      .print();
  }

  async generatePDF(): Promise<TDocumentDefinitions> {
    const weekTable = this.getWeekTable();
    const doc: TDocumentDefinitions = {
      header: {
        columns: [
          {
            columns: [
              {
                image: await this.filesServ.getBase64ImageFromURL(
                  this.schoolsService.getLogo(this.session.currentSchool)
                ),
                width: 60,
              },
            ],
          },
          {
            alignment: 'center',
            fontSize: 9,
            bold: true,
            stack: [
              this.session.currentSchool.name.toUpperCase(),
              'ASIGNACIONES',
              `GRUPO: ${this.session.currentStudent.group.name}`,
              `SEMANA: ${format(this.mapped[0].date, 'd \'de\' MMMM', {
                locale: es,
              })} - ${format(this.mapped[4].date, 'd \'de\' MMMM', {
                locale: es,
              })}`.toUpperCase(),
            ],
            margin: [0, 10, 0, 0],
          },
          { text: '' },
        ],
        margin: [20, 10, 20, 10],
      },
      pageMargins: [30, 90, 30, 60],
      content: [{ table: weekTable }],
    };
    return doc;
  }

  getWeekTable() {
    const table: Table = { body: [], widths: [100, 400], headerRows: 1 };
    table.body.push([
      { text: 'Día', fontsize: 9, bold: true },
      { text: 'Tareas', fontsize: 9, bold: true, alignment: 'center' },
    ]);
    this.mapped.forEach((day) => {
      const element: TableCell[] = [];
      const tasks = { stack: [] };
      element.push([
        { text: this.formatDate(day.date), fontSize: 9, bold: true },
        { text: '' },
      ]);
      day.assignments.forEach((assignment) => {
        tasks.stack.push({
          text: `${assignment?.course?.subject?.name} / ${assignment.title} / ${assignment.type.name}`,
          bold: true,
          fontSize: 9,
        });
        assignment.contentBlocks.forEach((block) => {
          if (block.type === 'paragraph') {
            tasks.stack.push({
              text: this.sanitize(block.data.text),
              fontSize: 8,
              margin: [0, 0, 0, 10],
            });
          }
        });
      });

      element.push([{ text: '' }, tasks]);
      table.body.push(element);
    });
    return table;
  }

  sanitize(text: string): string {
    text = text.replace(/(<([^>]+)>)/gi, '');
    text = text.replace(/\&nbsp;/g, '');
    return text;
  }
}

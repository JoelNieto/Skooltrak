import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DAYS_OF_WEEK } from 'angular-calendar';
import { format, formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { SurveyFormComponent } from 'src/app/shared/components/survey-form/survey-form.component';
import { Activity } from 'src/app/shared/models/activities.model';
import { ExamResult } from 'src/app/shared/models/exams.model';
import { Survey } from 'src/app/shared/models/surveys.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { SurveysService } from 'src/app/shared/services/surveys.service';

@Component({
  selector: 'skooltrak-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  currentSurveys$: Observable<Survey[]>;
  exams$: Observable<ExamResult[]>;
  activities$: Observable<Activity[]>;

  weekStartsOn = DAYS_OF_WEEK.SUNDAY;
  constructor(
    private studentsService: StudentsService,
    private modal: NgbModal,
    public coursesService: CoursesService,
    private session: SessionService,
    private surveysService: SurveysService
  ) {}

  ngOnInit(): void {
    this.currentSurveys$ = this.surveysService.getCurrentSurveys();
    this.exams$ = this.studentsService.getExams(
      this.session.currentStudent?.id
    );
    this.activities$ = this.studentsService.getActivities(
      this.session.currentStudent?.id
    );
  }

  public hexToRGBA(hex: string, opacity: number): string {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      // eslint-disable-next-line no-bitwise
      return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
        ','
      )},${opacity})`;
    }
  }

  formatDate(date: Date) {
    return format(date, 'iiii d', { locale: es });
  }

  formatDue(date: Date) {
    return formatDistance(new Date(), new Date(date), {
      locale: es,
    });
  }

  getValues() {
    const array: string[][] = [];
    return array;
  }

  answerSurvey(id: string) {
    const modalRef = this.modal.open(SurveyFormComponent, { size: 'lg' });
    modalRef.result.then(() => {
      this.currentSurveys$ = this.surveysService.getCurrentSurveys();
    });
    modalRef.componentInstance.surveyId = id;
  }
}

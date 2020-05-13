import { Component, OnInit, Input } from '@angular/core';
import { Survey, SurveyAnswer } from 'src/app/shared/models/surveys.model';
import { SurveysService } from 'src/app/shared/services/surveys.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.sass'],
})
export class ParticipantsComponent implements OnInit {
  @Input() survey: Survey;

  sortGroup = false;
  answers: Observable<SurveyAnswer[]>;
  constructor(
    private surveyService: SurveysService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.answers = this.surveyService.getAnswers(this.survey.id).pipe(
      map((answer) => {
        answer.sort((a, b) => {
          return a.student.fullName < b.student.fullName ? -1 : 1;
        });
        return answer;
      })
    );
  }

  sortByGroup() {
    this.sortGroup = !this.sortGroup;
    console.log('val:', this.sortGroup);
    if (this.sortGroup)  {
      this.answers = this.answers.pipe(
        map((answer) => {
          answer.sort((a, b) => {
            return a.student.group.level.id < b.student.group.level.id ? -1 : 1;
          });
          return answer;
        })
      );
    } else {
      this.answers = this.answers.pipe(
        map((answer) => {
          answer.sort((a, b) => {
            return a.student.fullName < b.student.fullName ? -1 : 1;
          });
          return answer;
        })
      );
    }
  }
}

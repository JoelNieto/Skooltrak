import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Survey } from 'src/app/shared/models/surveys.model';
import { SurveysService } from 'src/app/shared/services/surveys.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.sass'],
})
export class ParticipantsComponent implements OnInit {
  @Input() survey: Survey;
  table = new TableOptions();
  answers: Observable<any[]>;
  constructor(
    private surveyService: SurveysService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.searcheable = false;
    this.table.lookup = true;
    this.table.exportToCSV = true;
    this.table.columns = [
      {
        name: 'student',
        title: this.transloco.translate('Student'),
        type: 'object',
        filterable: true,
        objectText: 'student.fullName',
      },
      {
        name: 'group',
        title: this.transloco.translate('Group'),
        type: 'object',
        lookup: true,
      },
    ];

    this.survey.questions.forEach((questions, i) => {
      this.table.columns.push({
        name: 'question' + [i],
        title: 'Pregunta ' + [i + 1],
        lookup: true,
      });
    });

    this.answers = this.surveyService.getAnswers(this.survey.id).pipe(
      map((answers) =>
        answers.map((answer) => {
          answer.questions.forEach((question, i) => {
            question.answerText = this.survey.questions[i].options[
              question.answerIndex
            ].answerText;
            answer['question' + [i]] = question.answerText;
          });
          return answer;
        })
      )
    );
  }
}

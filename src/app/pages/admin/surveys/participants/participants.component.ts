import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { Survey, SurveyAnswer } from 'src/app/shared/models/surveys.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { SurveysService } from 'src/app/shared/services/surveys.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.sass'],
})
export class ParticipantsComponent implements OnInit {
  @Input() survey: Survey;
  table = new TableOptions();
  groups: Observable<ClassGroup[]>;
  sortGroup = false;
  currentGroup: ClassGroup = undefined;
  currentQuestion: any = undefined;
  answers: Observable<any[]>;
  filtered: Observable<SurveyAnswer[]>;
  resume: any[] = [];
  constructor(
    private surveyService: SurveysService,
    private groupsService: ClassGroupsService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.groups = this.groupsService.getAll();
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
        lookup: true
      },
    ];
    this.survey.questions.forEach((questions, i) => {
      this.table.columns.push({ name: 'question' + [i], title: 'Pregunta ' + [i + 1], lookup: true })
    });
    this.answers = this.surveyService.getAnswers(this.survey.id).pipe(
      map((answers) => {
        answers.sort((a, b) => {
          return a.student.fullName < b.student.fullName ? -1 : 1;
        });
        return answers;
      }),
      map((answers) => {
        return answers.map((answer: any) => {
          answer.questions.forEach((question, i) => {
            question.answerText = this.survey.questions[i].options[
              question.answerIndex
            ].answerText;
            answer['question' + [i]] = question.answerText;
          });
          console.log(answer);
          return answer;
        });
      })
    );
  }


  sortByGroup() {
    this.sortGroup = !this.sortGroup;
    if (this.sortGroup) {
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

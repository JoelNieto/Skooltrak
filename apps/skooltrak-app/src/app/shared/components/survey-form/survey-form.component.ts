import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { Survey, SurveyAnswer } from '../../models/surveys.model';
import { SurveysService } from '../../services/surveys.service';

@Component({
  selector: 'skooltrak-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.sass'],
})
export class SurveyFormComponent implements OnInit {
  @Input() surveyId: string;
  survey$: Observable<Survey>;
  isReady: boolean;
  answer: SurveyAnswer = { questions: [] };
  constructor(
    private surveysService: SurveysService,
    public modal: NgbActiveModal,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.survey$ = this.surveysService.get(this.surveyId);
    this.survey$.subscribe({
      next: (res) => {
        this.answer.survey = { id: res.id, name: res.title };
        res.questions.forEach((question) => {
          const current = {
            questionText: question.questionText,
            answerIndex: undefined,
          };
          this.answer.questions.push(current);
        });
      },
      error: (err) => console.error(err),
    });
  }

  selectOption(question: number, option: number): void {
    this.answer.questions[question].answerIndex = option;
    this.validateReady();
  }

  isSelected(index: number, option: number) {
    return this.answer.questions[index]?.answerIndex === option;
  }

  validateReady() {
    this.isReady =
      this.answer?.questions.filter((x) => x.answerIndex !== undefined)
        .length === this.answer?.questions.length;
  }

  send() {
    this.surveysService.answer(this.answer).subscribe({
      next: (res) => {
        Swal.fire(
          this.answer.survey.name,
          this.transloco.translate('Survey completed'),
          'success'
        );
        this.modal.close();
      },
      error: (err) => console.error(err),
    });
  }
}

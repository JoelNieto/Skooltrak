import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Exam,
  ExamQuestion,
  ExamResult,
} from 'src/app/shared/models/exams.model';
import { ExamResultsService } from 'src/app/shared/services/exam-results.service';
import { ExamsService } from 'src/app/shared/services/exams.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent implements OnInit {
  exam$: Observable<Exam>;
  result: ExamResult;

  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 50,
    minHeight: 50,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
        ],
      ],
      ['fontsize', ['fontsize', 'color']],
      ['insert', ['picture']],
    ],
  };
  constructor(
    private route: ActivatedRoute,
    private resultService: ExamResultsService,
    private examsService: ExamsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.resultService
        .get(params.id)
        .pipe(
          map((result) => {
            this.result = result;
            this.exam$ = this.examsService.get(result.exam.id).pipe(
              map((exam) => {
                this.result.answers = new Array(exam.questions.length);
                exam.questions.forEach((question, i) => {
                  this.result.answers[i] = {};
                  this.result.answers[i].question = question;
                });
                return exam;
              })
            );
          })
        )
        .subscribe(() => {});
    });
  }

  changeValue(index: number, question: ExamQuestion, value: any) {}
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { QuestionEnum } from 'src/app/shared/enums/exams.enum';
import { Exam, ExamAnswer, ExamResult } from 'src/app/shared/models/exams.model';
import { ExamsService } from 'src/app/shared/services/exams.service';
import { FilesService } from 'src/app/shared/services/files.service';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.sass'],
})
export class ResultDetailsComponent implements OnInit {
  @Input() result: ExamResult;

  exam$: Observable<Exam>;
  constructor(
    public modal: NgbActiveModal,
    private examService: ExamsService,
    public files: FilesService
  ) {}

  ngOnInit(): void {
    this.exam$ = this.examService.get(this.result.exam.id);
  }

  isCorrect(answer: ExamAnswer): boolean {
    if (answer.question.type.code === QuestionEnum.TRUEFALSE.code) {
      return answer.question.trueFalse === answer.responseBoolean;
    }

    if (answer.question.type.code === QuestionEnum.SELECTION.code) {
      return answer.selection.isCorrect;
    }
  }
}

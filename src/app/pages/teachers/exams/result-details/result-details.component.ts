import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionEnum } from 'src/app/shared/enums/exams.enum';
import { ExamAnswer, ExamResult } from 'src/app/shared/models/exams.model';
import { ExamResultsService } from 'src/app/shared/services/exam-results.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.sass'],
})
export class ResultDetailsComponent {
  @Input() result: ExamResult;
  constructor(
    public modal: NgbActiveModal,
    private resultsService: ExamResultsService
  ) {}

  isCorrect(answer: ExamAnswer): boolean {
    if (answer.question.type.code === QuestionEnum.TRUEFALSE.code) {
      return answer.question.trueFalse === answer.responseBoolean;
    }

    if (answer.question.type.code === QuestionEnum.SELECTION.code) {
      return answer.selection.isCorrect;
    }
  }

  updatePoints(i: number, value: number) {
    this.result.answers[i].points = value;
  }

  saveGrades() {
    this.result.status = 3;
    this.resultsService.complete(this.result.id, this.result).subscribe(
      () => {
        Swal.fire('Calificación guardada exitosamente', '', 'success');
        this.modal.close();
      },
      (err) => console.error(err)
    );
  }
}

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizResult } from 'src/app/shared/models/quizes.model';

@Component({
  selector: 'skooltrak-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent {
  @Input() result: QuizResult;
  constructor(public modal: NgbActiveModal) {}
}

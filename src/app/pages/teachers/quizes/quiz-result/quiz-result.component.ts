import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizResult } from 'src/app/shared/models/quizes.model';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.sass']
})
export class QuizResultComponent implements OnInit {
  @Input() result: QuizResult;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizResult } from 'src/app/shared/models/quizes.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent implements OnInit {
  @Input() result: QuizResult;
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamResult } from 'src/app/shared/models/exams.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent implements OnInit {
  @Input() result: ExamResult;
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ExamAssignation, ExamResult } from 'src/app/shared/models/exams.model';
import { ExamAssignationsService } from 'src/app/shared/services/exam-assignations.service';

import { ResultDetailsComponent } from '../result-details/result-details.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent implements OnInit {
  results: Observable<ExamResult[]>;
  assignation: Observable<ExamAssignation>;
  constructor(
    private route: ActivatedRoute,
    private assignationsService: ExamAssignationsService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.results = this.assignationsService.getResults(params.id);
      this.assignation = this.assignationsService.get(params.id);
    });
  }

  seeAnswers(result: ExamResult) {
    const modalRef = this.modal.open(ResultDetailsComponent, { size: 'xl' });
    modalRef.result.then(() => {
      this.route.params.subscribe((params) => {
        this.results = this.assignationsService.getResults(params.id);
        this.assignation = this.assignationsService.get(params.id);
      });
    });
    modalRef.componentInstance.result = result;
  }
}

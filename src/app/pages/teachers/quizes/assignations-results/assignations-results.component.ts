import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { QuizAssignation, QuizResult } from 'src/app/shared/models/quizes.model';
import { QuizesAssignationsService } from 'src/app/shared/services/quiz-assignations.service';

import { QuizResultComponent } from '../quiz-result/quiz-result.component';

@Component({
  selector: 'skooltrak-assignations-results',
  templateUrl: './assignations-results.component.html',
  styleUrls: ['./assignations-results.component.sass'],
})
export class AssignationsResultsComponent implements OnInit {
  results$: Observable<QuizResult[]>;
  assignation$: Observable<QuizAssignation>;
  constructor(
    private route: ActivatedRoute,
    private assignationService: QuizesAssignationsService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.assignation$ = this.assignationService.get(params.id);
        this.results$ = this.assignationService.getResults(params.id);
      },
      error: (err) => console.error(err),
    });
  }

  formatGrade(grade: number) {
    if (grade < 3) {
      return 'alert-grade';
    } else if (grade < 4) {
      return 'ok-grade';
    } else {
      return 'success-grade';
    }
  }

  seeAnswers(result: QuizResult) {
    const modalRef = this.modal.open(QuizResultComponent, { size: 'lg' });
    modalRef.componentInstance.result = result;
  }
}

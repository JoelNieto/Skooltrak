import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ExamAssignation, ExamResult } from 'src/app/shared/models/exams.model';
import { ExamAssignationsService } from 'src/app/shared/services/exam-assignations.service';
import { ExamResultsService } from 'src/app/shared/services/exam-results.service';
import Swal from 'sweetalert2';

import { ResultDetailsComponent } from '../result-details/result-details.component';

@Component({
  selector: 'skooltrak-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent implements OnInit {
  results$: Observable<ExamResult[]>;
  assignation$: Observable<ExamAssignation>;
  constructor(
    private route: ActivatedRoute,
    private assignationsService: ExamAssignationsService,
    private resultService: ExamResultsService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.results$ = this.assignationsService.getResults(params.id);
        this.assignation$ = this.assignationsService.get(params.id);
      },
      error: (err) => console.error(err),
    });
  }

  seeAnswers(result: ExamResult) {
    const modalRef = this.modal.open(ResultDetailsComponent, { size: 'xl' });
    modalRef.result.then(() => {
      this.route.params.subscribe({
        next: (params) => {
          this.results$ = this.assignationsService.getResults(params.id);
          this.assignation$ = this.assignationsService.get(params.id);
        },
        error: (err) => console.error(err),
      });
    });
    modalRef.componentInstance.result = result;
  }

  async reAssign(result: ExamResult) {
    const response = await Swal.fire({
      title: result.student.name,
      text: 'Desea volver a asignar el examen a este estudiante?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#A0AEC0',
      confirmButtonColor: '#E53E3E',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí, reasignar',
    });
    if (response.isConfirmed) {
      result.status = 0;
      this.resultService
        .complete(result.id, result)
        .pipe(mergeMap(() => this.route.params))
        .subscribe({
          next: (params) => {
            this.results$ = this.assignationsService.getResults(params.id);
          },
          error: (err) => console.error(err),
        });
    }
  }
}

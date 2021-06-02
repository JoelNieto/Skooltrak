import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ExamResult } from 'src/app/shared/models/exams.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

import { ResultDetailsComponent } from '../result-details/result-details.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass'],
})
export class ResultsComponent implements OnInit {
  results$: Observable<ExamResult[]>;
  constructor(
    private session: SessionService,
    private studentsService: StudentsService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.results$ = this.studentsService.getExamResults(
      this.session.currentStudent.id
    );
  }

  seeAnswers(result: ExamResult) {
    const modalRef = this.modal.open(ResultDetailsComponent, { size: 'xl' });
    modalRef.componentInstance.result = result;
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { QuizResult } from 'src/app/shared/models/quizes.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

import { ResultsComponent } from './results/results.component';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.sass'],
})
export class QuizesComponent implements OnInit {
  quizes$: Observable<QuizResult[]>;
  results$: Observable<QuizResult[]>;
  constructor(
    private studentsService: StudentsService,
    private session: SessionService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.quizes$ = this.studentsService.getQuizes(
      this.session.currentStudent.id
    );
    this.results$ = this.studentsService.getQuizResults(
      this.session.currentStudent.id
    );
  }

  seeAnswers(result: QuizResult) {
    const modalRef = this.modal.open(ResultsComponent, { size: 'lg' });
    modalRef.componentInstance.result = result;
  }

  formatDue(date: Date) {
    return formatDistance(new Date(), new Date(date), {
      locale: es,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { ExamResult } from 'src/app/shared/models/exams.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.sass'],
})
export class ExamsComponent implements OnInit {
  exams$: Observable<ExamResult[]>;
  results$: Observable<ExamResult[]>;
  constructor(
    private studentsService: StudentsService,
    private session: SessionService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.exams$ = this.studentsService.getExams(this.session.currentStudent.id);
    this.results$ = this.studentsService.getExamResults(
      this.session.currentStudent.id
    );
  }

  formatDue(date: Date) {
    return formatDistance(new Date(), new Date(date), {
      locale: es,
    });
  }
}

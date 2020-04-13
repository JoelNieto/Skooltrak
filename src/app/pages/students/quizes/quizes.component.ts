import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizResult } from 'src/app/shared/models/quizes.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.sass'],
})
export class QuizesComponent implements OnInit {
  quizes$: Observable<QuizResult[]>;
  constructor(
    private studentsService: StudentsService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.quizes$ = this.studentsService.getQuizes(
      this.session.currentStudent.id
    );
  }

  formatDue(date: Date) {
    return formatDistance(new Date(), new Date(date), {
      locale: es
    });
  }

}

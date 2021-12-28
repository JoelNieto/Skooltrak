import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Quiz } from 'src/app/shared/models/quizes.model';
import { QuizesService } from 'src/app/shared/services/quizes.service';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';

import { QuizesFormComponent } from '../quizes-form/quizes-form.component';

@Component({
  selector: 'skooltrak-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrls: ['./new-quiz.component.sass'],
})
export class NewQuizComponent {
  @ViewChild(QuizesFormComponent) form: QuizesFormComponent;
  constructor(
    private quizService: QuizesService,
    private transloco: TranslocoService,
    private session: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  saveQuiz(quiz: Quiz) {
    quiz.teacher = this.session.currentTeacher;
    this.quizService.create(quiz).subscribe({
      next: (res) => {
        Swal.fire(
          res.title,
          this.transloco.translate('Created item', {
            value: this.transloco.translate('Quiz'),
          }),
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
        this.form.saving = false;
      },
      error: (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
        this.form.saving = false;
      },
    });
  }
}

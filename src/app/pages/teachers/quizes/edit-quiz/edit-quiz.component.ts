import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Quiz } from 'src/app/shared/models/quizes.model';
import { QuizesService } from 'src/app/shared/services/quizes.service';
import swal from 'sweetalert2';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.sass'],
})
export class EditQuizComponent implements OnInit {
  quiz: Quiz;
  isOwner: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizesService: QuizesService,
    private translate: TranslocoService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.quizesService.get(params.id).subscribe((res) => {
        this.isOwner = this.session.currentTeacher.id === res.teacher.id;
        this.quiz = res;
      });
    });
  }

  saveQuiz(quiz: Quiz) {
    this.quizesService.edit(quiz.id, quiz).subscribe(() => {
      swal.fire(
        quiz.title,
        this.translate.translate('Updated item', {
          value: this.translate.translate('Quiz'),
        }),
        'success'
      );
      this.router.navigate(['./'], { relativeTo: this.route.parent });
    });
  }
}

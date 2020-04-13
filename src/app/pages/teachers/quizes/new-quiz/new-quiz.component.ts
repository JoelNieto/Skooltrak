import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Quiz } from 'src/app/shared/models/quizes.model';
import { QuizesService } from 'src/app/shared/services/quizes.service';
import swal from 'sweetalert2';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrls: ['./new-quiz.component.sass']
})
export class NewQuizComponent implements OnInit {
  constructor(
    private quizService: QuizesService,
    private translate: TranslocoService,
    private session: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  saveQuiz(quiz: Quiz) {
    quiz.teacher = this.session.currentTeacher;
    this.quizService.create(quiz).subscribe(res => {
      swal.fire(
        res.title,
        this.translate.translate('Created item', {
          value: this.translate.translate('Quiz')
        }),
        'success'
      );
      this.router.navigate(['./'], { relativeTo: this.route.parent });
    });
  }
}

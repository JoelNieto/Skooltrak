import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Quiz } from 'src/app/shared/models/quizes.model';
import { QuizesService } from 'src/app/shared/services/quizes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.sass']
})
export class EditQuizComponent implements OnInit {
  quiz: Quiz;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizesService: QuizesService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quizesService.get(params.id).subscribe(res => {
        this.quiz = res;
      });
    });
  }

  saveQuiz(quiz: Quiz) {
    this.quizesService.edit(quiz.id, quiz).subscribe(() => {
      swal.fire(
        quiz.title,
        this.translate.instant('Updated item', {
          value: this.translate.instant('Quiz')
        }),
        'success'
      );
      this.router.navigate(['./'], { relativeTo: this.route.parent });
    });
  }
}

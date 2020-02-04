import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';
import { QuizesService } from 'src/app/shared/services/quizes.service';
import { Quiz } from 'src/app/shared/models/quizes.model';

@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrls: ['./new-quiz.component.sass']
})
export class NewQuizComponent implements OnInit {
  constructor(
    private quizService: QuizesService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  saveQuiz(quiz: Quiz) {
    this.quizService.create(quiz).subscribe(res => {
      swal.fire(
        res.title,
        this.translate.instant('Created item', {
          value: this.translate.instant('Quiz')
        }),
        'success'
      );
      this.router.navigate(['./'], { relativeTo: this.route.parent });
    });
  }
}

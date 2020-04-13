import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Option, Question, Quiz, QuizResult } from 'src/app/shared/models/quizes.model';
import { QuizResultsService } from 'src/app/shared/services/quiz-results.service';
import { QuizesService } from 'src/app/shared/services/quizes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent implements OnInit {
  result: QuizResult;
  quiz$: Observable<Quiz>;
  isReady: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultsService: QuizResultsService,
    private quizService: QuizesService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.resultsService.get(params.id).subscribe((res) => {
        this.result = res;
        this.quiz$ = this.quizService.get(this.result.quiz.id).pipe(
          map((quiz) => {
            this.result.answers = new Array(quiz.questions.length);
            return quiz;
          })
        );
      });
    });
  }

  selectOption(index: number, question: Question, option: Option): void {
    if (this.result.answers[index]?.selected.optionText !== option.optionText) {
      this.result.answers[index] = { selected: option, question: question };
    } else {
      this.result.answers[index] = undefined;
    }
    this.validateReady();
  }

  isSelected(index: number, option: Option) {
    return (
      this.result.answers[index]?.selected.optionText === option.optionText
    );
  }

  validateReady() {
    this.isReady =
      this.result?.answers.filter((x) => this.isEmpty(x) === false).length ===
      this.result?.answers.length;
  }

  isEmpty(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  async sendQuiz() {
    const resp = await Swal.fire({
      title: this.transloco.translate('Are you sure?'),
      text: this.transloco.translate('We are sendind this quiz. This is final'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#38A169',
      cancelButtonColor: '#718096',
      cancelButtonText: this.transloco.translate('Cancel'),
      confirmButtonText: this.transloco.translate('Im sure'),
    });

    if (resp.value) {
      this.result.status = 2;

      this.resultsService
        .complete(this.result.id, this.result)
        .subscribe(() => {
          Swal.fire(
            this.transloco.translate('Quiz completed'),
            this.transloco.translate('Yout score gonna be available soon'),
            'success'
          );
          this.router.navigate(['../'], { relativeTo: this.route });
        });
    }
  }
}

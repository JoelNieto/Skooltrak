import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addMinutes, addSeconds, format } from 'date-fns';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { QuestionEnum } from 'src/app/shared/enums/exams.enum';
import { Exam, ExamQuestion, ExamResult } from 'src/app/shared/models/exams.model';
import { Option } from 'src/app/shared/models/quizes.model';
import { ExamResultsService } from 'src/app/shared/services/exam-results.service';
import { ExamsService } from 'src/app/shared/services/exams.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent implements OnInit {
  exam$: Observable<Exam>;
  result: ExamResult;
  seconds: number;
  timeLeft: string;
  interval: any;

  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 200,
    minHeight: 50,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
        ],
      ],
      ['para', ['ul', 'ol', 'paragraph']],
      ['fontsize', ['fontsize', 'color']],
      ['insert', ['table', 'picture']],
    ],
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultService: ExamResultsService,
    private examsService: ExamsService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap((params) =>
          this.resultService.get(params.id).pipe(
            map((result) => {
              this.result = result;
              if (result.minutes > 0) {
                this.startTimer();
              }
              this.exam$ = this.examsService.get(result.exam.id).pipe(
                map((exam) => {
                  this.result.totalPoints = exam.questions.reduce(
                    (sum, x) => sum + x.points,
                    0
                  );
                  this.result.answers = new Array(exam.questions.length);
                  exam.questions.forEach((question, i) => {
                    this.result.answers[i] = {};
                    this.result.answers[i].question = question;
                  });
                  return exam;
                })
              );
            })
          )
        )
      )
      .subscribe({ next: () => {}, error: (err) => console.error(err) });
  }

  startTimer() {
    this.seconds = this.result.minutes * 60;
    this.interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        clearInterval(this.interval);
        this.result.status = 2;
        Swal.fire(
          'Fin del examen',
          'El tiempo del examen se ha vencido. Pronto el docente subirá tu calificación final!',
          'info'
        );
        this.resultService.complete(this.result.id, this.result).subscribe({
          next: () => {
            console.info('=== Auto guadardado ===');
          },
          error: (err) => console.error(err),
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    }, 1000);
  }

  formatTimeLeft(): string {
    let time = addSeconds(new Date(0), this.seconds);
    time = addMinutes(time, time.getTimezoneOffset());
    return format(time, 'H:mm:ss');
  }

  changeValue(index: number, question: ExamQuestion, value: any) {
    switch (question.type.code) {
      case QuestionEnum.NUMBER.code:
        this.result.answers[index].responseNumber = Number(value);
        break;
      case QuestionEnum.TEXT.code:
      case QuestionEnum.LONGTEXT.code:
        this.result.answers[index].responseText = value;
        break;
      case QuestionEnum.TRUEFALSE.code:
        this.result.answers[index].responseBoolean =
          value === 'true' ? true : false;
        break;
      case QuestionEnum.SELECTION.code:
        if (
          this.result.answers[index]?.selection?.optionText !== value.optionText
        ) {
          this.result.answers[index].selection = value;
        } else {
          this.result.answers[index].selection = undefined;
        }
        break;
      case QuestionEnum.MATCH.code:
        this.result.answers[index].matchList = value;
        break;
      default:
        break;
    }
    this.result.status = 1;
    this.resultService.complete(this.result.id, this.result).subscribe({
      next: () => {
        console.info('=== Auto guadardado ===');
      },
      error: (err) => console.error(err),
    });
  }

  async complete() {
    const resp = await Swal.fire({
      title: 'Estás seguro?',
      text: '¿Estás seguro de haber completado el examen? No podrás volver a intentarlo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#38A169',
      cancelButtonColor: '#718096',
      cancelButtonText: 'Aún no',
      confirmButtonText: 'Sí, he terminado',
    });
    if (resp.isConfirmed) {
      this.result.status = 2;
      this.resultService.complete(this.result.id, this.result).subscribe({
        next: () => {
          clearInterval(this.interval);
          this.seconds = 0;
          Swal.fire(
            'Fin del examen',
            'Has terminado el examen. Pronto el docente subirá tu calificación final. ¡Buena suerte!',
            'success'
          );
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => console.error(err),
      });
    }
  }

  isSelected(index: number, option: Option) {
    return (
      this.result.answers[index]?.selection?.optionText === option.optionText
    );
  }
}

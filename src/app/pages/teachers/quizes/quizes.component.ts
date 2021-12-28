import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/shared/models/quizes.model';
import { QuizesService } from 'src/app/shared/services/quizes.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.sass'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        query('.card-body', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(30, animate('500ms cubic-bezier(0.23, 1, 0.32, 1)')),
        ]),
      ]),
    ]),
  ],
})
export class QuizesComponent implements OnInit {
  quizes$: Observable<Quiz[]>;
  table = new TableOptions();
  constructor(
    private translate: TranslocoService,
    private quizesService: QuizesService,
    private session: SessionService,
    private teachersService: TeachersService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.lookup = true;
    this.table.columns = [
      {
        name: 'title',
        title: this.translate.translate('Title'),
        filterable: true,
      },
      {
        name: 'course',
        title: this.translate.translate('Course'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'createDate',
        title: this.translate.translate('Create date'),
        type: 'datetime',
      },
      {
        name: 'modificateDate',
        title: this.translate.translate('Modificate date'),
        type: 'datetime',
      },
    ];

    this.table.newURL = ['new'];
    this.table.detailsURL = [];

    this.quizes$ = this.teachersService.getQuizes(
      this.session.currentTeacher.id
    );
  }

  deleteQuiz(id: string) {
    this.quizesService.delete(id).subscribe({
      next: () => {
        Swal.fire(
          this.translate.translate('Deleted item', {
            value: this.translate.translate('Quiz'),
          }),
          '',
          'info'
        );
      },
      error: (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
      },
    });
  }
}

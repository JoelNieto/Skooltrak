import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/shared/models/quizes.model';
import { QuizesService } from 'src/app/shared/services/quizes.service';
import Swal from 'sweetalert2';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.sass']
})
export class QuizesComponent implements OnInit {
  quizes: Observable<Quiz[]>;
  table = new TableOptions();
  constructor(
    private translate: TranslocoService,
    private quizesService: QuizesService,
    private session: SessionService,
    private teachersService: TeachersService,
    private transloco: TranslocoService
  ) {}

  ngOnInit() {
    this.table.lookup = true;
    this.table.columns = [
      {
        name: 'title',
        title: this.translate.translate('Title'),
        filterable: true
      },
      {
        name: 'course',
        title: this.translate.translate('Course'),
        type: 'object',
        lookup: true
      },
      {
        name: 'createDate',
        title: this.translate.translate('Create date'),
        type: 'datetime'
      },
      {
        name: 'modificateDate',
        title: this.translate.translate('Modificate date'),
        type: 'datetime'
      }
    ];

    this.table.newURL = ['new'];
    this.table.detailsURL = [];

    this.quizes = this.teachersService.getQuizes(this.session.currentTeacher.id);
  }

  deleteQuiz(id: string) {
    this.quizesService.delete(id).subscribe(
      () => {
        Swal.fire(
          this.translate.translate('Deleted item', {
            value: this.translate.translate('Quiz')
          }),
          '',
          'info'
        );
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
      }
    );
  }
}

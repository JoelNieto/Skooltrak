import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/shared/models/quizes.model';
import { QuizesService } from 'src/app/shared/services/quizes.service';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.sass']
})
export class QuizesComponent implements OnInit {
  quizes: Observable<Quiz[]>;
  table = new TableOptions();
  constructor(
    private translate: TranslateService,
    private quizesService: QuizesService
  ) {}

  ngOnInit() {
    this.table.lookup = true;
    this.table.columns = [
      {
        name: 'title',
        title: this.translate.instant('Title'),
        filterable: true
      },
      {
        name: 'level',
        title: this.translate.instant('Level'),
        type: 'object',
        lookup: true
      },
      {
        name: 'subject',
        title: this.translate.instant('Subject'),
        type: 'object',
        lookup: true
      },
      {
        name: 'createDate',
        title: this.translate.instant('Create date'),
        type: 'datetime'
      },
      {
        name: 'modificateDate',
        title: this.translate.instant('Modificate date'),
        type: 'datetime'
      }
    ];

    this.table.newURL = ['new'];
    this.table.detailsURL = [];

    this.quizes = this.quizesService.getAll();
  }
}

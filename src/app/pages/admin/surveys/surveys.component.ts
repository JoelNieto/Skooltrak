import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/shared/models/surveys.model';
import { SurveysService } from 'src/app/shared/services/surveys.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.sass'],
})
export class SurveysComponent implements OnInit {
  surveys$: Observable<Survey[]>;
  table = new TableOptions();
  constructor(
    private surveysService: SurveysService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.columns = [
      {
        title: this.transloco.translate('Title'),
        name: 'title',
        filterable: true,
      },
      {
        title: this.transloco.translate('Create date'),
        name: 'createDate',
        type: 'datetime',
      },
      {
        title: this.transloco.translate('Created by'),
        name: 'createUser',
        type: 'object',
        objectColumn: 'createUser.displayName',
      },
      {
        title: this.transloco.translate('Start date'),
        name: 'beginDate',
        type: 'datetime',
      },
      {
        title: this.transloco.translate('Due date'),
        name: 'endDate',
        type: 'datetime',
      },
    ];
    this.table.newURL = ['new'];
    this.table.detailsURL = [];
    this.surveys$ = this.surveysService.getAll();
  }
}

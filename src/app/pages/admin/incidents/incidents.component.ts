import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Incident } from 'src/app/shared/models/incidents.model';
import { IncidentsService } from 'src/app/shared/services/incidents.service';

@Component({
  selector: 'skooltrak-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.sass'],
})
export class IncidentsComponent implements OnInit {
  table = new TableOptions();
  incidents$: Observable<Incident[]>;
  constructor(
    private incidentsService: IncidentsService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.lookup = true;
    this.table.columns = [
      { name: 'title', title: this.transloco.translate('Title') },
      {
        name: 'student',
        title: this.transloco.translate('Student'),
        type: 'object',
      },
      {
        name: 'course',
        title: this.transloco.translate('Course'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'incidentDate',
        title: this.transloco.translate('Incident date'),
        type: 'date',
      },
      {
        name: 'createdBy',
        title: this.transloco.translate('Created by'),
        type: 'object',
        objectColumn: 'createdBy.displayName',
        lookup: true,
      },
      {
        name: 'createdAt',
        title: this.transloco.translate('Create date'),
        type: 'datetime',
      },
    ];
    this.table.newURL = ['new'];
    this.table.detailsURL = [];
    this.incidents$ = this.incidentsService.getAll();
  }
}

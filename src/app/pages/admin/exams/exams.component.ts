import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/shared/models/exams.model';
import { ExamsService } from 'src/app/shared/services/exams.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.sass'],
})
export class ExamsComponent implements OnInit {
  exams: Observable<Exam[]>;
  table = new TableOptions();
  constructor(
    private examsService: ExamsService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.lookup = true;
    this.table.columns = [
      {
        name: 'title',
        title: this.transloco.translate('Title'),
        filterable: true,
      },
      {
        name: 'teacher',
        title: this.transloco.translate('Teacher'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'course',
        title: this.transloco.translate('Course'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'createDate',
        title: this.transloco.translate('Create date'),
        type: 'datetime',
      },
    ];
    this.table.detailsURL = [];
    this.exams = this.examsService.getAll();
  }
}

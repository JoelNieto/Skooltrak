import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/shared/models/exams.model';
import { ExamsService } from 'src/app/shared/services/exams.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.sass'],
})
export class ExamsComponent implements OnInit {
  table = new TableOptions();
  exams$: Observable<Exam[]>;
  constructor(
    private examsService: ExamsService,
    private teachersService: TeachersService,
    private session: SessionService,
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
      {
        name: 'modificateDate',
        title: this.transloco.translate('Modificate date'),
        type: 'datetime',
      },
    ];

    this.table.newURL = ['new'];
    this.table.detailsURL = [];
    this.exams$ = this.teachersService.getExams(this.session.currentTeacher.id);
  }

  deleteExam(id: string) {
    this.examsService.delete(id).subscribe(
      () => {
        Swal.fire(
          this.transloco.translate('Deleted item', {
            value: this.transloco.translate('Exam'),
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

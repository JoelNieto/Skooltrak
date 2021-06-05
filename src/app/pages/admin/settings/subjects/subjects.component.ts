import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/shared/models/subjects.model';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.sass'],
})
export class SubjectsComponent implements OnInit {
  table = new TableOptions();
  subjects$: Observable<Subject[]>;
  constructor(
    private subjectServ: SubjectsService,
    private translate: TranslocoService
  ) {}

  ngOnInit() {
    this.table.searcheable = true;
    this.table.columns = [
      {
        name: 'name',
        title: this.translate.translate('Name'),
        required: true,
        filterable: true,
      },
      {
        name: 'shortName',
        title: this.translate.translate('Short name'),
        required: true,
        filterable: true,
      },
      {
        name: 'parent',
        title: this.translate.translate('Parent subject'),
        type: 'object',
        asyncList: this.subjectServ.getAll(),
      },
      {
        name: 'code',
        title: this.translate.translate('Code'),
        filterable: true,
      },
    ];
    this.subjects$ = this.subjectServ.getAll();
  }

  createSubject(subject: Subject) {
    this.subjectServ.create(subject).subscribe(
      (res) => {
        swal.fire(
          res.name,
          this.translate.translate('Created itemf', {
            value: this.translate.translate('Subject'),
          }),
          'success'
        );
        this.subjects$ = this.subjectServ.getAll();
      },
      (err) => console.error(err)
    );
  }

  editSubject(subject: Subject) {
    this.subjectServ.edit(subject.id, subject).subscribe(
      () => {
        swal.fire(
          subject.name,
          this.translate.translate('Updated itemf', {
            value: this.translate.translate('Subject'),
          }),
          'success'
        );
        this.subjects$ = this.subjectServ.getAll();
      },
      (err) => console.error(err)
    );
  }

  deleteSubject(id: string) {
    this.subjectServ.delete(id).subscribe(
      () => {
        swal.fire(
          this.translate.translate('Deleted itemf', {
            value: this.translate.translate('Subject'),
          }),
          '',
          'info'
        );
      },
      (err) => console.error(err)
    );
  }
}

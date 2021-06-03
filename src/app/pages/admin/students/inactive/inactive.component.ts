import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.sass'],
})
export class InactiveComponent implements OnInit {
  students$: Observable<Student[]>;
  table = new TableOptions();
  constructor(
    private studentsService: StudentsService,
    private translate: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.lookup = true;
    this.table.exportToCSV = true;
    this.table.columns = [
      {
        name: 'fullName',
        title: this.translate.translate('Name'),
        filterable: true,
      },
      {
        name: 'firstName',
        title: this.translate.translate('First name'),
        filterable: true,
        hidden: true,
      },
      {
        name: 'middleName',
        title: this.translate.translate('Middle name'),
        filterable: true,
        hidden: true,
      },
      {
        name: 'surname',
        title: this.translate.translate('Surname'),
        filterable: true,
        hidden: true,
      },
      {
        name: 'secondSurname',
        title: this.translate.translate('Second surname'),
        filterable: true,
        hidden: true,
      },
      {
        name: 'documentId',
        title: this.translate.translate('Document ID'),
        filterable: true,
      },
      {
        name: 'gender',
        title: this.translate.translate('Gender'),
        hidden: true,
        lookup: true,
      },
      {
        name: 'plan',
        title: this.translate.translate('Level'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'age',
        title: this.translate.translate('Age'),
        hidden: true,
      },
    ];
    this.students$ = this.studentsService.getInactive();
    this.table.detailsURL = [];
    this.table.newURL = ['new'];
  }
}

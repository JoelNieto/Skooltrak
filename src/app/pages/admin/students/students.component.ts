import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { StudentSummary } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass'],
})
export class StudentsComponent implements OnInit {
  table = new TableOptions();
  students$: Observable<StudentSummary[]>;
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
        name: 'group',
        title: this.translate.translate('Group'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'age',
        title: this.translate.translate('Age'),
        hidden: true,
      },
    ];
    this.students$ = this.studentsService.getAll();
    this.table.detailsURL = [];
    this.table.newURL = ['new'];
  }

  deleteStudent(id: string) {
    this.studentsService.delete(id).subscribe({
      next: () => {
        Swal.fire(
          this.translate.translate('Deleted item', {
            value: this.translate.translate('Student'),
          }),
          '',
          'info'
        );
      },
      error: (err: Error) => {
        Swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { StudentsService } from 'src/app/shared/services/students.service';
import { StudentSummary } from 'src/app/shared/models/students.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {
  table = new TableOptions();
  students: Observable<StudentSummary[]>;
  constructor(
    private studentsService: StudentsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.table.lookup = true;
    this.table.exportToCSV = true;
    this.table.columns = [
      {
        name: 'fullName',
        title: this.translate.instant('Name'),
        filterable: true
      },
      {
        name: 'documentId',
        title: this.translate.instant('Document ID'),
        filterable: true
      },
      {
        name: 'gender',
        title: this.translate.instant('Gender'),
        hidden: true,
        lookup: true
      },
      {
        name: 'plan',
        title: this.translate.instant('Level'),
        type: 'object',
        lookup: true
      },
      {
        name: 'group',
        title: this.translate.instant('Group'),
        type: 'object',
        lookup: true
      },
      {
        name: 'age',
        title: this.translate.instant('Age'),
        type: 'object',
        hidden: true
      },
      {
        name: 'dueAmount',
        title: this.translate.instant('Due amount'),
        type: 'money'
      },
      {
        name: 'isDefault',
        title: this.translate.instant('Is default'),
        type: 'boolean',
        lookup: true
      }
    ];
    this.students = this.studentsService.getAll();
    this.table.detailsURL = [];
    this.table.newURL = ['new'];
  }

  deleteStudent(id: string) {
    this.studentsService.delete(id).subscribe(
      () => {
        Swal.fire(
          this.translate.instant('Deleted item', {
            value: this.translate.instant('Student')
          }),
          '',
          'info'
        );
      },
      (err: Error) => {
        Swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }
}

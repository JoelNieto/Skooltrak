import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {

  table = new TableOptions();
  students: Observable<Student[]>;
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
        type: 'object',
        lookup: true
      },
      {
        name: 'group',
        title: this.translate.instant('Group'),
        type: 'object',
        objectText: 'name',
        lookup: true
      },
      {
        name: 'age',
        title: this.translate.instant('Age'),
        hidden: true
      },
      {
        name: 'createDate',
        title: this.translate.instant('Create date'),
        type: 'datetime',
        hidden: true
      },
      {
        name: 'createdUser',
        title: this.translate.instant('Created by'),
        type: 'object',
        hidden: true,
        objectColumn: 'createdUser.displayName'
      }
    ];
    this.students = this.studentsService.getAll();
    this.table.detailsURL = [];
    this.table.newURL = ['New'];
  }

}

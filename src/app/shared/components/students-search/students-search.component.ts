import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';

import { Student, StudentSummary } from '../../models/students.model';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'skooltrak-students-search',
  templateUrl: './students-search.component.html',
  styleUrls: ['./students-search.component.sass'],
})
export class StudentsSearchComponent implements OnInit {
  @Input() selected: Student;

  students$: Observable<StudentSummary[]>;
  table = new TableOptions();
  constructor(
    private studentsServ: StudentsService,
    public activeModal: NgbActiveModal,
    private translate: TranslocoService
  ) {}

  ngOnInit(): void {
    this.students$ = this.studentsServ.getAll();
    this.table.type = 'single-select';
    this.table.lookup = true;
    this.table.columns = [
      {
        name: 'name',
        title: this.translate.translate('Name'),
        filterable: true,
      },
      {
        name: 'documentId',
        title: this.translate.translate('Document ID'),
        filterable: true,
      },
      {
        name: 'level',
        title: this.translate.translate('Level'),
        type: 'object',
        objectColumn: 'group.level.name',
        lookup: true,
      },
      {
        name: 'group',
        title: this.translate.translate('Group'),
        type: 'object',
        objectText: 'name',
        lookup: true,
      },
    ];
  }

  setStudent(selection: Student[]) {
    this.selected = selection[0];
  }
}

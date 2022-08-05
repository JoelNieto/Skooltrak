import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';

@Component({
  selector: 'skooltrak-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass'],
})
export class StudentsComponent implements OnInit, OnChanges {
  @Input() groupId: string;
  table = new TableOptions();
  students$: Observable<Student[]>;

  constructor(
    private translate: TranslocoService,
    private groupsService: ClassGroupsService
  ) {}

  ngOnInit(): void {
    this.table.lookup = true;
    this.table.exportToCSV = true;
    this.table.detailsURL = ['..', '..', 'students'];
    this.table.columns = [
      {
        name: 'fullName',
        title: this.translate.translate('Full name'),
        filterable: true,
      },
      {
        name: 'documentId',
        title: this.translate.translate('Document ID'),
        filterable: true,
      },
      { name: 'code', title: this.translate.translate('Code') },
      {
        name: 'gender',
        title: this.translate.translate('Gender'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'birthDate',
        title: this.translate.translate('Date of birth'),
        type: 'date',
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.groupId) {
      if (this.groupId) {
        this.students$ = this.groupsService.getStudents(this.groupId);
      }
    }
  }
}

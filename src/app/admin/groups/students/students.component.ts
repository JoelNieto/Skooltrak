import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit, OnChanges {
  @Input() groupId: string;
  table = new TableOptions();
  students: Observable<Student[]>;

  constructor(
    private translate: TranslateService,
    private groupsService: ClassGroupsService
  ) {}

  ngOnInit(): void {
    this.table.lookup = true;
    this.table.exportToCSV = true;
    this.table.detailsURL = ['..', '..', 'students'];
    this.table.columns = [
      {
        name: 'fullName',
        title: this.translate.instant('Full name'),
        filterable: true
      },
      {
        name: 'documentId',
        title: this.translate.instant('Document ID'),
        filterable: true
      },
      { name: 'code', title: this.translate.instant('Code') },
      {
        name: 'gender',
        title: this.translate.instant('Gender'),
        type: 'object',
        lookup: true
      },
      {
        name: 'birthDate',
        title: this.translate.instant('Date of birth'),
        type: 'date'
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.groupId) {
      if (this.groupId) {
        this.students = this.groupsService.getStudents(this.groupId);
      }
    }
  }
}

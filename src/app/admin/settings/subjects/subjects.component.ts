import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from 'custom-components';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/shared/models/subjects.model';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.sass']
})
export class SubjectsComponent implements OnInit {
  table = new TableOptions();
  subjects: Observable<Subject[]>;
  constructor(
    private subjectServ: SubjectsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.table.searcheable = true;
    this.table.columns = [
      {
        name: 'name',
        title: this.translate.instant('Name'),
        required: true,
        filterable: true
      },
      {
        name: 'shortName',
        title: this.translate.instant('Short name'),
        filterable: true
      },
      {
        name: 'code',
        title: this.translate.instant('Code'),
        filterable: true
      }
    ];
    this.subjects = this.subjectServ.getAll();
  }

  createSubject(subject: Subject) {
    this.subjectServ.create(subject).subscribe(res => {
      swal.fire(
        res.name,
        this.translate.instant('Created itemf', {
          value: this.translate.instant('Subject')
        }),
        'success'
      );
      this.subjects = this.subjectServ.getAll();
    });
  }

  editSubject(subject: Subject) {
    this.subjectServ.edit(subject.id, subject).subscribe(() => {
      swal.fire(
        subject.name,
        this.translate.instant('Updated itemf', {
          value: this.translate.instant('Subject')
        }),
        'success'
      );
      this.subjects = this.subjectServ.getAll();
    });
  }

  deleteSubject(id: string) {
    this.subjectServ.delete(id).subscribe(() => {
      swal.fire(
        this.translate.instant('Deleted itemf', {
          value: this.translate.instant('Subject')
        }),
        '',
        'info'
      );
    });
  }

}

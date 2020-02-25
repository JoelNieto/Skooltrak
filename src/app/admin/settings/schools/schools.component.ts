import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from 'projects/custom-components/src/public-api';
import { Observable } from 'rxjs';
import { School } from 'src/app/shared/models/schools.model';
import { SchoolsService } from 'src/app/shared/services/schools.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.sass']
})
export class SchoolsComponent implements OnInit {
  schools: Observable<School[]>;
  table = new TableOptions();
  constructor(
    private schoolsServ: SchoolsService,
    private translate: TranslocoService
  ) {}

  ngOnInit() {
    this.table.columns = [
      { name: 'name', title: this.translate.translate('Name') },
      { name: 'shortName', title: this.translate.translate('Short name') },
      {
        name: 'createDate',
        title: this.translate.translate('Create date'),
        type: 'datetime'
      },
      {
        name: 'modificateDate',
        title: this.translate.translate('Modificate date'),
        type: 'datetime'
      }
    ];
    this.table.detailsURL = [];
    this.table.newURL = ['new'];
    this.schools = this.schoolsServ.getAll();
  }
}

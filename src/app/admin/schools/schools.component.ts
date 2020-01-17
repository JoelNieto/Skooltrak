import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
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
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.table.columns = [
      { name: 'name', title: this.translate.instant('Name') },
      { name: 'shortName', title: this.translate.instant('Short name') },
      {
        name: 'createDate',
        title: this.translate.instant('Create date'),
        type: 'datetime'
      },
      {
        name: 'modificateDate',
        title: this.translate.instant('Modificate date'),
        type: 'datetime'
      }
    ];
    this.table.detailsURL = [];
    this.table.newURL = ['New'];
    this.schools = this.schoolsServ.getAll();
  }
}

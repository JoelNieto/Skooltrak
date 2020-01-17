import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass']
})
export class GroupsComponent implements OnInit {

  table = new TableOptions();
  groups: Observable<ClassGroup[]>;

  constructor(
    private translate: TranslateService,
    private groupsService: ClassGroupsService
  ) {}

  ngOnInit() {
    this.table.lookup = true;
    this.table.searcheable = false;
    this.table.columns = [
      {
        name: 'name',
        title: this.translate.instant('Name'),
        required: true
      },
      {
        name: 'level',
        title: this.translate.instant('Level'),
        type: 'object',
        lookup: true
      },
      {
        name: 'studyPlan',
        title: this.translate.instant('Study plan'),
        type: 'object',
        lookup: true
      },
      {
        name: 'counselor',
        title: this.translate.instant('Counselor'),
        type: 'object',
        required: true,
        lookup: true
      }
    ];
    this.table.detailsURL = [];
    this.groups = this.groupsService.getAll();
  }
}

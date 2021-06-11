import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
})
export class GroupsComponent implements OnInit {
  groups$: Observable<ClassGroup[]>;
  table = new TableOptions();

  constructor(
    private teachersService: TeachersService,
    private session: SessionService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.permissions.read = false;
    this.table.columns = [
      {
        name: 'name',
        title: this.transloco.translate('Name'),
        required: true,
      },
      {
        name: 'level',
        title: this.transloco.translate('Level'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'studyPlan',
        title: this.transloco.translate('Study plan'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'counselor',
        title: this.transloco.translate('Counselor'),
        type: 'object',
        required: true,
        lookup: true,
      },
    ];
    this.table.detailsURL = [];
    this.groups$ = this.teachersService.getGroups(
      this.session.currentTeacher.id
    );
  }
}

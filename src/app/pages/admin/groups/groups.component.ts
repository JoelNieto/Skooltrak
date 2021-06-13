import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
})
export class GroupsComponent implements OnInit {
  table = new TableOptions();
  groups$: Observable<ClassGroup[]>;

  constructor(
    private translate: TranslocoService,
    private groupsService: ClassGroupsService,
    private teachers: TeachersService
  ) {}

  ngOnInit() {
    this.table.lookup = true;
    this.table.searchable = false;
    this.table.columns = [
      {
        name: 'name',
        title: this.translate.translate('Name'),
        required: true,
      },
      {
        name: 'level',
        title: this.translate.translate('Level'),
        type: 'object',
        lookup: true,
        readonly: true,
      },
      {
        name: 'studyPlan',
        title: this.translate.translate('Study plan'),
        type: 'object',
        lookup: true,
        readonly: true,
      },
      {
        name: 'counselor',
        title: this.translate.translate('Counselor'),
        type: 'object',
        asyncList: this.teachers.getAll(),
      },
    ];
    this.table.detailsURL = [];
    this.groups$ = this.groupsService.getAll();
  }

  editGroup(group: ClassGroup): void {
    this.groupsService.edit(group.id, group).subscribe(
      () => {
        Swal.fire(
          group.name,
          this.translate.translate('Updated item', {
            value: this.translate.translate('Group'),
          }),
          'success'
        );
        this.groups$ = this.groupsService.getAll();
      },
      (err: Error) => {
        Swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      }
    );
  }
}

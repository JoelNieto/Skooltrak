import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { ClassGroup, StudyPlan } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass']
})
export class GroupsComponent implements OnInit, OnChanges {
  @Input() plan: StudyPlan;
  groups: Observable<ClassGroup[]>;
  table = new TableOptions();
  constructor(
    private groupsService: ClassGroupsService,
    private plansService: StudyPlanService,
    private teachers: TeachersService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.table.searcheable = false;
    this.table.columns = [
      {
        name: 'name',
        title: this.translate.instant('Name'),
        required: true
      },
      {
        name: 'counselor',
        title: this.translate.instant('Counselor'),
        type: 'object',
        asyncList: this.teachers.getAll()
      },
      {
        name: 'createDate',
        title: this.translate.instant('Create date'),
        type: 'datetime',
        readonly: true
      },
      {
        name: 'modificateDate',
        title: this.translate.instant('Modificate date'),
        type: 'datetime',
        readonly: true
      }
    ];

    this.table.detailsURL = ['..', '..', '..', 'Groups'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.plan) {
      if (this.plan) {
        this.groups = this.plansService.getGroups(this.plan.id);
      }
    }
  }

  createGroup(group: ClassGroup): void {
    group.level = this.plan.level;
    group.studyPlan = { id: this.plan.id, name: this.plan.name };
    this.groupsService.create(group).subscribe(
      res => {
        swal.fire(
          res.name,
          this.translate.instant('Created item', {
            value: this.translate.instant('Group')
          }),
          'success'
        );
        this.groups = this.plansService.getGroups(this.plan.id);
      },
      (err: Error) => {
        swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }

  editGroup(group: ClassGroup): void {
    this.groupsService.edit(group.id, group).subscribe(
      () => {
        swal.fire(
          group.name,
          this.translate.instant('Updated item', {
            value: this.translate.instant('Group')
          }),
          'success'
        );
        this.groups = this.plansService.getGroups(this.plan.id);
      },
      (err: Error) => {
        swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }

  deleteGroup(id: string) {
    this.groupsService.delete(id).subscribe(
      () => {
        swal.fire(
          this.translate.instant('Deleted item', {
            value: this.translate.instant('Group')
          }),
          '',
          'success'
        );
        this.groups = this.plansService.getGroups(this.plan.id);
      },
      (err: Error) => {
        swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }
}

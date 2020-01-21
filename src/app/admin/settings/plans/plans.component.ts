import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Level, StudyPlan } from 'src/app/shared/models/studyplans.model';
import { DegreesService } from 'src/app/shared/services/degrees.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.sass']
})
export class PlansComponent implements OnInit {
  table = new TableOptions();
  plans: Observable<StudyPlan[]>;
  levels: Level[] = [
    { id: 0, name: 'Pre-Kinder', ordinal: 'PK' },
    { id: 1, name: 'Kinder', ordinal: 'K' },
    { id: 2, name: 'Primero', ordinal: '1º' },
    { id: 3, name: 'Segundo', ordinal: '2º' },
    { id: 4, name: 'Tercero', ordinal: '3º' },
    { id: 5, name: 'Cuarto', ordinal: '4º' },
    { id: 6, name: 'Quinto', ordinal: '5º' },
    { id: 7, name: 'Sexto', ordinal: '6º' },
    { id: 8, name: 'Séptimo', ordinal: '7º' },
    { id: 9, name: 'Octavo', ordinal: '8º' },
    { id: 10, name: 'Noveno', ordinal: '9º' },
    { id: 11, name: 'Décimo', ordinal: '10º' },
    { id: 12, name: 'Undécimo', ordinal: '11º' },
    { id: 13, name: 'Duedécimo', ordinal: '12º' }
  ];
  constructor(
    private planServ: StudyPlanService,
    private degreeServ: DegreesService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.table.lookup = true;
    this.table.columns = [
      {
        name: 'degree',
        title: this.translate.instant('Degree'),
        type: 'object',
        asyncList: this.degreeServ.getAll(),
        required: true,
        lookup: true
      },
      {
        name: 'name',
        title: this.translate.instant('Name'),
        required: true,
        filterable: true
      },
      {
        name: 'level',
        title: this.translate.instant('Level'),
        type: 'object',
        list: this.levels,
        objectText: 'name',
        required: true,
        listDisplay: 'ordinal',
        lookup: true
      },
      {
        name: 'monthlyCost',
        title: this.translate.instant('Monthly cost'),
        type: 'money',
        required: true
      },
      {
        name: 'hasUser',
        title: this.translate.instant('Has user'),
        type: 'boolean',
        required: true
      },
      {
        name: 'description',
        title: this.translate.instant('Description'),
        type: 'text',
        filterable: true,
        hidden: true
      }
    ];
    this.table.detailsURL = [];
    this.plans = this.planServ.getAll();
  }

  createPlan(plan: StudyPlan) {
    this.planServ.create(plan).subscribe(
      res => {
        swal.fire(
          res.name,
          this.translate.instant('Created item', {
            value: this.translate.instant('Study plan')
          }),
          'success'
        );
        this.plans = this.planServ.getAll();
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

  editPlan(plan: StudyPlan) {
    this.planServ.edit(plan.id, plan).subscribe(
      () => {
        swal.fire(
          plan.name,
          this.translate.instant('Updated item', {
            value: this.translate.instant('Study plan')
          }),
          'success'
        );
        this.plans = this.planServ.getAll();
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

  deletePlan(id: string) {
    this.planServ.delete(id).subscribe(
      () => {
        swal.fire(
          this.translate.instant('Deleted item', {
            value: this.translate.instant('Study plan')
          }),
          '',
          'info'
        );
        this.plans = this.planServ.getAll();
      },
      (err: Error) =>
        swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        )
    );
  }
}

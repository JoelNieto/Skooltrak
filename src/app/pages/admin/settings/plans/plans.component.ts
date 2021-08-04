import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Level, StudyPlan } from 'src/app/shared/models/studyplans.model';
import { DegreesService } from 'src/app/shared/services/degrees.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.sass'],
})
export class PlansComponent implements OnInit {
  table = new TableOptions();
  plans$: Observable<StudyPlan[]>;
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
    { id: 13, name: 'Duedécimo', ordinal: '12º' },
  ];
  constructor(
    private planServ: StudyPlanService,
    private degreeServ: DegreesService,
    private translate: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.lookup = true;
    this.table.columns = [
      {
        name: 'degree',
        title: this.translate.translate('Degree'),
        type: 'object',
        asyncList: this.degreeServ.getAll(),
        required: true,
        lookup: true,
      },
      {
        name: 'name',
        title: this.translate.translate('Name'),
        required: true,
        filterable: true,
      },
      {
        name: 'level',
        title: this.translate.translate('Level'),
        type: 'object',
        list: this.levels,
        objectText: 'name',
        required: true,
        listDisplay: 'ordinal',
        lookup: true,
      },
      {
        name: 'monthlyCost',
        title: this.translate.translate('Monthly cost'),
        type: 'money',
        required: true,
      },
      {
        name: 'preschool',
        title: this.translate.translate('Preschool'),
        type: 'boolean',
        required: true,
      },
      {
        name: 'hasUser',
        title: this.translate.translate('Has user'),
        type: 'boolean',
        required: true,
      },
      {
        name: 'description',
        title: this.translate.translate('Description'),
        type: 'text',
        filterable: true,
        hidden: true,
      },
    ];
    this.table.detailsURL = [];
    this.plans$ = this.planServ.getAll();
  }

  createPlan(plan: StudyPlan) {
    this.planServ.create(plan).subscribe(
      (res) => {
        swal.fire(
          res.name,
          this.translate.translate('Created item', {
            value: this.translate.translate('Study plan'),
          }),
          'success'
        );
        this.plans$ = this.planServ.getAll();
      },
      (err: Error) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
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
          this.translate.translate('Updated item', {
            value: this.translate.translate('Study plan'),
          }),
          'success'
        );
        this.plans$ = this.planServ.getAll();
      },
      (err: Error) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      }
    );
  }

  deletePlan(id: string) {
    this.planServ.delete(id).subscribe(
      () => {
        swal.fire(
          this.translate.translate('Deleted item', {
            value: this.translate.translate('Study plan'),
          }),
          '',
          'info'
        );
        this.plans$ = this.planServ.getAll();
      },
      (err: Error) =>
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        )
    );
  }
}

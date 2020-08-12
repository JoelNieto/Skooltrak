import { Component, OnInit } from '@angular/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Period } from 'src/app/shared/models/periods.model';
import { PeriodsService } from 'src/app/shared/services/periods.service';
import Swal from 'sweetalert2';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.sass'],
})
export class PeriodsComponent implements OnInit {
  periods: Observable<Period[]>;
  table = new TableOptions();
  constructor(
    private periodsService: PeriodsService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.columns = [
      { name: 'sort', title: 'Orden', type: 'number', required: true },
      { name: 'name', title: 'Nombre', required: true },
      { name: 'startDate', title: 'Fecha inicio', type: 'date' },
      { name: 'endDate', title: 'Fecha finalización', type: 'date' },
    ];

    this.periods = this.periodsService.getAll();
  }

  create(period: Period) {
    this.periodsService.create(period).subscribe(
      (res) => {
        Swal.fire(res.name, 'Periodo creado exitosamente', 'success');
        this.periods = this.periodsService.getAll();
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
      }
    );
  }

  edit(period: Period) {
    this.periodsService.edit(period.id, period).subscribe(
      () => {
        Swal.fire(period.name, 'Periodo actualizado exitosamente', 'success');
        this.periods = this.periodsService.getAll();
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
      }
    );
  }

  delete(id: string) {
    this.periodsService.delete(id).subscribe(
      () => {
        Swal.fire('', 'Period eliminado exitosamente', 'success');
        this.periods = this.periodsService.getAll();
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
      }
    );
  }
}

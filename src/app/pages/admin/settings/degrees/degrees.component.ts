import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Degree } from 'src/app/shared/models/studyplans.model';
import { DegreesService } from 'src/app/shared/services/degrees.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.sass']
})
export class DegreesComponent implements OnInit {
  table = new TableOptions();
  degrees: Observable<Degree[]>;
  constructor(
    private degreesServ: DegreesService,
    private translate: TranslocoService
  ) {}

  ngOnInit() {
    this.table.columns = [
      { name: 'name', title: this.translate.translate('Name'), required: true },
      {
        name: 'description',
        title: this.translate.translate('Description'),
        type: 'text'
      }
    ];

    this.degrees = this.degreesServ.getAll();
  }

  createDegree(degree: Degree) {
    this.degreesServ.create(degree).subscribe(
      res => {
        swal.fire('Título creado', res.name, 'success');
        this.degrees = this.degreesServ.getAll();
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

  editDegree(degree: Degree) {
    this.degreesServ.edit(degree.id, degree).subscribe(
      () => {
        swal.fire('Título actualizado', degree.name, 'success');
        this.degrees = this.degreesServ.getAll();
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
  deleteDegree(id: string) {
    this.degreesServ.delete(id).subscribe(
      () => {
        swal.fire('Título actualizado', '', 'info');
        this.degrees = this.degreesServ.getAll();
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
}

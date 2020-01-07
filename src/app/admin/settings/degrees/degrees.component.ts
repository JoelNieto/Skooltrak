import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from 'custom-components';
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
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.table.columns = [
      { name: 'name', title: this.translate.instant('Name'), required: true },
      {
        name: 'description',
        title: this.translate.instant('Description'),
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
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
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
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
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
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }
}

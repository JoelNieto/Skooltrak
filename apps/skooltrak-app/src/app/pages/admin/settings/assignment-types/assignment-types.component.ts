import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { AssignmentType } from 'src/app/shared/models/assignments.model';
import { AssignmentTypesService } from 'src/app/shared/services/assignmenttypes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-assignment-types',
  templateUrl: './assignment-types.component.html',
  styleUrls: ['./assignment-types.component.sass'],
})
export class AssignmentTypesComponent implements OnInit {
  table = new TableOptions();
  types$: Observable<AssignmentType[]>;
  constructor(
    private typesService: AssignmentTypesService,
    private translate: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.columns = [
      {
        name: 'name',
        title: this.translate.translate('Name'),
        required: true,
        filterable: true,
      },
      {
        name: 'sumative',
        title: this.translate.translate('Sumative'),
        required: true,
        type: 'boolean',
      },
    ];

    this.types$ = this.typesService.getAll();
  }

  createType(type: AssignmentType) {
    this.typesService.create(type).subscribe({
      next: (res) => {
        swal.fire(
          res.name,
          this.translate.translate('Created item', {
            value: this.translate.translate('Assignment type'),
          }),
          'success'
        );
        this.types$ = this.typesService.getAll();
      },
      error: (err: Error) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      },
    });
  }

  editType(type: AssignmentType) {
    this.typesService.edit(type.id, type).subscribe({
      next: () => {
        swal.fire(
          type.name,
          this.translate.translate('Updated item', {
            value: this.translate.translate('Assignment type'),
          }),
          'success'
        );
        this.types$ = this.typesService.getAll();
      },
      error: (err: Error) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      },
    });
  }

  deleteType(id: string) {
    this.typesService.delete(id).subscribe({
      next: () => {
        swal.fire(
          this.translate.translate('Deleted item', {
            value: this.translate.translate('Assignment type'),
          }),
          '',
          'info'
        );
      },
      error: (err: Error) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      },
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Role } from 'src/app/shared/models/users.model';
import { RolesService } from 'src/app/shared/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.sass'],
})
export class RolesComponent implements OnInit {
  roles$: Observable<Role[]>;
  table = new TableOptions();

  constructor(
    private rolesService: RolesService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.columns = [
      {
        name: 'name',
        title: this.transloco.translate('Name'),
        required: true,
        readonly: true,
      },
      {
        name: 'code',
        title: this.transloco.translate('Code'),
        type: 'number',
        required: true,
        readonly: true,
      },
      {
        name: 'description',
        title: this.transloco.translate('Description'),
        type: 'text',
      },
    ];
    this.roles$ = this.rolesService.getAll();
  }

  edit(role: Role) {
    this.rolesService.edit(role.id, role).subscribe(
      () => {
        Swal.fire(
          this.transloco.translate('Updated item', {
            value: this.transloco.translate('Role'),
          }),
          '',
          'success'
        );
        this.roles$ = this.rolesService.getAll();
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

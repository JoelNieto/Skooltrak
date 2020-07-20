import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/users.model';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsersService } from 'src/app/shared/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  table = new TableOptions();
  constructor(
    private usersServ: UsersService,
    private roles: RolesService,
    private transloco: TranslocoService
  ) {}

  ngOnInit() {
    this.table.exportToCSV = true;
    this.table.lookup = true;
    this.table.columns = [
      {
        name: 'displayName',
        title: this.transloco.translate('Name'),
        filterable: true,
        required: true
      },
      {
        name: 'email',
        title: this.transloco.translate('Email')
      },
      {
        name: 'userName',
        title: this.transloco.translate('User name'),
        required: true
      },
      {
        name: 'role',
        title: this.transloco.translate('Role'),
        type: 'object',
        lookup: true,
        asyncList: this.roles.getAll()
      },
      {
        name: 'blocked',
        title: this.transloco.translate('Blocked'),
        type: 'boolean',
        lookup: true,
        required: true
      },
      {
        name: 'plan',
        title: this.transloco.translate('Level'),
        type: 'object',
        lookup: true,
        readonly: true
      },
      {
        name: 'group',
        title: this.transloco.translate('Group'),
        type: 'object',
        lookup: true,
        readonly: true
      },
      {
        name: 'password',
        title: this.transloco.translate('Password'),
        hidden: true,
        required: true
      },
      {
        name: 'registerDate',
        title: this.transloco.translate('Create date'),
        type: 'datetime',
        readonly: true
      }
    ];
    this.users = this.usersServ.getAll();
  }

  createUser(user: User) {
    this.usersServ.create(user).subscribe(
      res => {
        Swal.fire(
          res.displayName,
          this.transloco.translate('Created item', {
            value: this.transloco.translate('User')
          }),
          'success'
        );
      },
      (err: HttpErrorResponse) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.error),
          'error'
        );
      }
    );
  }

  updateUser(user: User) {
    this.usersServ.edit(user.id, user).subscribe(
      () => {
        Swal.fire(
          user.displayName,
          this.transloco.translate('Created item', {
            value: this.transloco.translate('User')
          }),
          'success'
        );
        this.users = this.usersServ.getAll();
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

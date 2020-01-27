import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/users.model';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsersService } from 'src/app/shared/services/users.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

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
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.table.columns = [
      {
        name: 'displayName',
        title: this.translate.instant('Name'),
        filterable: true,
        required: true
      },
      { name: 'email', title: this.translate.instant('Email'), required: true },
      {
        name: 'userName',
        title: this.translate.instant('User name'),
        required: true
      },
      {
        name: 'role',
        title: this.translate.instant('Role'),
        type: 'object',
        asyncList: this.roles.getAll()
      },
      {
        name: 'password',
        title: this.translate.instant('Password'),
        required: true
      },
      {
        name: 'registerDate',
        title: this.translate.instant('Create date'),
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
          this.translate.instant('Created item', {
            value: this.translate.instant('User')
          }),
          'success'
        );
      },
      (err: HttpErrorResponse) => {
        Swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.error),
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
          this.translate.instant('Created item', {
            value: this.translate.instant('User')
          }),
          'success'
        );
        this.users = this.usersServ.getAll();
      },
      (err: Error) => {
        Swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }
}

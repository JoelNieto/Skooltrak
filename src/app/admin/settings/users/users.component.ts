import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/users.model';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { TableOptions } from '@skooltrak/custom-components';

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
        name: 'registerDate',
        title: this.translate.instant('Register date'),
        type: 'datetime',
        readonly: true
      }
    ];

    this.table.detailsURL = [];
    this.users = this.usersServ.getAll();
  }
}

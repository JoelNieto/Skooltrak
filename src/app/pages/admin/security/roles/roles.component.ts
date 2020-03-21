import { Component, OnInit } from '@angular/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Role } from 'src/app/shared/models/users.model';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.sass']
})
export class RolesComponent implements OnInit {
  roles: Observable<Role[]>;
  table = new TableOptions();

  constructor(private rolesService: RolesService) { }

  ngOnInit() {
  }

}

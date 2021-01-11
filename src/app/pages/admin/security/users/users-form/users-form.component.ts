import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Access, Role, User } from 'src/app/shared/models/users.model';
import { AccessService } from 'src/app/shared/services/access.service';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.sass'],
})
export class UsersFormComponent implements OnInit {
  @Input() user: User;

  userForm: FormGroup;
  accesses: Observable<Access[]>;
  roles: Observable<Role[]>;
  constructor(
    private fb: FormBuilder,
    private accessService: AccessService,
    private rolesService: RolesService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [this.user ? this.user.id : ''],
      userName: [this.user ? this.user.userName : '', [Validators.required]],
      displayName: [this.user ? this.user.displayName : ''],
      role: [this.user ? this.user.role : null, [Validators.required]],
      email: [this.user ? this.user.email : ''],
      blocked: [this.user ? this.user.blocked : false],
      password: [this.user ? this.user.password : ''],
      adminAccess: [this.user ? this.user.adminAccess : []],
    });

    this.accesses = this.accessService.getAll();
    this.roles = this.rolesService.getAll();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

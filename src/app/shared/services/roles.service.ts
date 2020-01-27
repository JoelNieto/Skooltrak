import { Injectable } from '@angular/core';

import { Role } from '../models/users.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class RolesService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'roles';
  }

  getAll() {
    return this.http.get<Role[]>(this.url);
  }

  get(id: string) {
    return this.http.get<Role>(this.url, id);
  }

  create(role: Role) {
    return this.http.post<Role>(this.url, role);
  }

  edit(id: string, role: Role) {
    return this.http.edit(this.url, id, role);
  }

  delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

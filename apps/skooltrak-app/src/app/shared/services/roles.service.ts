import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Role } from '../models/users.model';

@Injectable({ providedIn: 'root' })
export class RolesService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'roles/';
  }

  getAll() {
    return this.http.get<Role[]>(this.url);
  }

  get(id: string) {
    return this.http.get<Role>(`${this.url}${id}`);
  }

  create(role: Role) {
    return this.http.post<Role>(this.url, role);
  }

  edit(id: string, role: Role) {
    return this.http.put(`${this.url}${id}`, role);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

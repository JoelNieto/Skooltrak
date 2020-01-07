import { Injectable } from '@angular/core';

import { User } from '../models/users.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string;
  constructor(
    private readonly conn: ConnectionService,
    private readonly http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'users';
  }

  public getAll() {
    return this.http.get<User[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<User>(this.url, id);
  }

  public getByProvider(id: string) {
    return this.http.get<User>(`${this.url}/${id}/provider`);
  }

  public create(user: User) {
    return this.http.post<User>(this.url, user);
  }

  public edit(id: string, user: User) {
    return this.http.edit(this.url, id, user);
  }
}
import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';

import { User } from '../models/users.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({
  providedIn: 'root',
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

  public changeAvatar(id: string, url: string) {
    return this.http.post(`${this.url}/${id}/ChangeAvatar`, { photoURL: url });
  }

  public getMessages(id: string) {
    return this.http.get<Message[]>(`${this.url}/${id}/messages`);
  }

  public updateInfo(id: string, user: User) {
    return this.http.edit(`${this.url}/${id}`, 'UpdateInfo', user);
  }

  public create(user: User) {
    return this.http.post<User>(this.url, user);
  }

  public edit(id: string, user: User) {
    return this.http.edit(this.url, id, user);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

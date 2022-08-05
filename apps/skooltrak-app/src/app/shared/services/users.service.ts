import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Message } from '../models/message.model';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string;
  constructor(private readonly http: HttpClient) {
    this.url = environment.urlAPI + 'users/';
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  public get(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}${id}`);
  }

  public changeAvatar(id: string, url: string): Observable<any> {
    return this.http.post(`${this.url}${id}/ChangeAvatar`, { photoURL: url });
  }

  public getMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.url}${id}/messages`);
  }

  public updateInfo(id: string, user: User): Observable<unknown> {
    return this.http.put(`${this.url}${id}/UpdateInfo`, user);
  }

  public create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  public edit(id: string, user: User): Observable<unknown> {
    return this.http.put(`${this.url}${id}`, user);
  }

  public delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.url}${id}`);
  }
}

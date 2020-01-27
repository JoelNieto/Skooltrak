import { Login, User } from '../models/users.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private url: string;
  constructor(
    private http: CustomHttpService,
    private conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'auth';
  }

  public login(login: Login) {
    return this.http.post<User>(`${this.url}/login`, login);
  }

  public resetPassword(email: string) {
    return this.http.get(`${this.url}/resetpassword`, email);
  }
}

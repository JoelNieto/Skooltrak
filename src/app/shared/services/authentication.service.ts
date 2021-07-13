import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Login, User } from '../models/users.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'auth';
  }

  public login(login: Login) {
    return this.http.post<User>(`${this.url}/login`, login);
  }

  public resetPassword(email: string) {
    return this.http.get(`${this.url}/resetpassword/${email}`);
  }

  public changePassword(password: string) {
    return this.http.post(`${this.url}/changepassword`, {
      newPassword: password,
    });
  }
}

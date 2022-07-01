import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role, User } from '@skooltrak-app/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  public login = (username: string, password: string) =>
    this.http.post<{ token: string; role: Role }>(`/api/auth/login`, {
      username,
      password,
    });

  public getProfile = () => this.http.get<Partial<User>>('/api/auth/profile');
}

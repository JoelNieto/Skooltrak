import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role, Teacher, User } from '@skooltrak-app/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  public login = (username: string, password: string) =>
    this.http.post<{ token: string; role: Role }>('/api/auth/login', {
      username,
      password,
    });

  public getProfile = () => this.http.get<Partial<User>>('/api/auth/profile');

  public getTeacher = () => this.http.get<Teacher>('/api/teachers/user');

  public logout = () => this.http.post('/api/auth/sign-out', null);

  public uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>('/api/auth/avatar', formData);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Teacher } from '@skooltrak-app/models';

@Injectable()
export class TeachersService {
  private http = inject(HttpClient);

  public getAll = () => this.http.get<Teacher[]>('/api/teachers');

  public get = (id: string) => this.http.get<Teacher>(`/api/teachers/${id}`);

  public post = (teacher: Teacher) =>
    this.http.post<Teacher>('/api/teachers', teacher);

  public patch = (id: string, teacher: Partial<Teacher>) =>
    this.http.patch<Teacher>(`/api/teachers/${id}`, teacher);

  public delete = (id: string) => this.http.delete(`/api/teachers/${id}`);
}

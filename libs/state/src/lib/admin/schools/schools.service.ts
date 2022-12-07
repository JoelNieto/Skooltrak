import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { School } from '@skooltrak-app/models';

@Injectable()
export class SchoolsService {
  private http = inject(HttpClient);

  public getAll = () => this.http.get<School[]>('/api/schools');

  public get = (id: string) => this.http.get<School>(`/api/schools/${id}`);

  public post = (school: School) =>
    this.http.post<School>('/api/schools', school);

  public patch = (id: string, school: Partial<School>) =>
    this.http.patch(`/api/schools/${id}`, school);
}

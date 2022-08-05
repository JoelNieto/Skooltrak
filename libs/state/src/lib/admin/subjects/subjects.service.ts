import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '@skooltrak-app/models';

@Injectable()
export class SubjectsService {
  constructor(private http: HttpClient) {}

  public getAll = () => this.http.get<Subject[]>('/api/subjects');

  public get = (id: string) => this.http.get<Subject>(`/api/subjects/${id}`);

  public post = (subject: Subject) =>
    this.http.post<Subject>('/api/subjects', subject);

  public patch = (id: string, subject: Partial<Subject>) =>
    this.http.patch<Subject>(`/api/subjects/${id}`, subject);

  public delete = (id: string) => this.http.delete(`/api/subjects/${id}`);
}

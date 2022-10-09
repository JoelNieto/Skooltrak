import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssignmentType } from '@skooltrak-app/models';

@Injectable()
export class AssignmentTypesService {
  constructor(private http: HttpClient) {}

  public getAll = () =>
    this.http.get<AssignmentType[]>('/api/assignment-types');

  public get = (id: string) =>
    this.http.get<AssignmentType>(`/api/assignment-types/${id}`);

  public post = (type: Partial<AssignmentType>) =>
    this.http.post<AssignmentType>('/api/assignment-types', type);

  public patch = (id: string, type: Partial<AssignmentType>) =>
    this.http.patch<AssignmentType>(`/api/assignment-types/${id}`, type);

  public delete = (id: string) =>
    this.http.delete(`/api/assignment-types/${id}`);
}

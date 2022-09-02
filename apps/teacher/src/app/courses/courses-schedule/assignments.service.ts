import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '@skooltrak-app/models';

@Injectable()
export class AssignmentsService {
  constructor(private http: HttpClient) {}

  getAll = (id: string) =>
    this.http.get<Assignment[]>('/api/assignments', { params: { course: id } });

  post = (item: Assignment) =>
    this.http.post<Assignment>('/api/assignments', item);
}

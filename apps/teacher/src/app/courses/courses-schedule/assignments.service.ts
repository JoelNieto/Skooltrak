import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Assignment } from '@skooltrak-app/models';

@Injectable()
export class AssignmentsService {
  private http = inject(HttpClient);

  getAll = (id: string) =>
    this.http.get<Assignment[]>('/api/assignments', { params: { course: id } });

  post = (item: Assignment) =>
    this.http.post<Assignment>('/api/assignments', item);
}

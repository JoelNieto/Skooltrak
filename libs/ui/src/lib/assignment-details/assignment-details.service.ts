import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '@skooltrak-app/models';

@Injectable()
export class AssignmentDetailsService {
  constructor(private http: HttpClient) {}

  getAssignment = (id: string) =>
    this.http.get<Assignment>(`/api/assignments/${id}`);
}

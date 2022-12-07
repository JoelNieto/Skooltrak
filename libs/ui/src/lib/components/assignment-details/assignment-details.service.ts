import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Assignment } from '@skooltrak-app/models';

@Injectable()
export class AssignmentDetailsService {
  private http = inject(HttpClient);

  getAssignment = (id: string) =>
    this.http.get<Assignment>(`/api/assignments/${id}`);
}

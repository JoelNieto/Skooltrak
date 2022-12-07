import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Assignment, QueryApi } from '@skooltrak-app/models';

@Injectable()
export class CalendarService {
  private http = inject(HttpClient);

  getAssignments = (start: Date, end: Date, query?: Partial<QueryApi>) =>
    this.http.get<Assignment[]>('/api/assignments', {
      params: {
        ...query,
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });

  deleteAssignment = (id: string) => this.http.delete(`/api/assignments/${id}`);
}

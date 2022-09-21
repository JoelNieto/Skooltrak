import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment, QueryApi } from '@skooltrak-app/models';

@Injectable()
export class CalendarService {
  constructor(private readonly http: HttpClient) {}

  getAssignments = (start: Date, end: Date, query: Partial<QueryApi>) =>
    this.http.get<Assignment[]>('/api/assignments', {
      params: {
        ...query,
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });
}

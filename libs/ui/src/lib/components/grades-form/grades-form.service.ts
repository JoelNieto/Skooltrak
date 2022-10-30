import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GradeType } from '@skooltrak-app/models';

@Injectable()
export class GradesFormService {
  constructor(private httpClient: HttpClient) {}

  getTypes = (course: string) =>
    this.httpClient.get<GradeType[]>('/api/grade-types', {
      params: { course },
    });
}

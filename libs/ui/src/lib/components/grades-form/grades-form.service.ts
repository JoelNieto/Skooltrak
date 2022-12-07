import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GradeType } from '@skooltrak-app/models';

@Injectable()
export class GradesFormService {
  private http = inject(HttpClient);

  getTypes = (course: string = '') =>
    this.http.get<GradeType[]>('/api/grade-types', {
      params: { course },
    });
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GradeType } from '@skooltrak-app/models';

@Injectable()
export class CourseGradeTypesService {
  private http = inject(HttpClient);

  getTypes = (id: string) =>
    this.http.get<GradeType[]>('/api/grade-types', { params: { course: id } });
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GradeType } from '@skooltrak-app/models';

@Injectable()
export class CourseGradeTypesService {
  constructor(private http: HttpClient) {}

  getTypes = (id: string) =>
    this.http.get<GradeType[]>(`/api/courses/${id}/grade-types`);
}

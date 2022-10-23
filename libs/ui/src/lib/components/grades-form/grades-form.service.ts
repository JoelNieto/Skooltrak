import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassGroup, Course, GradeType, Period } from '@skooltrak-app/models';

@Injectable()
export class GradesFormService {
  constructor(private readonly http: HttpClient) {}

  getPeriods = () => this.http.get<Period[]>('/api/periods');

  getCourses = () => this.http.get<Course[]>('/api/courses');

  getTypes = (id: string) =>
    this.http.get<GradeType[]>('/api/grade-types', { params: { course: id } });

  getGroups = (id: string) =>
    this.http.get<ClassGroup[]>('/api/class-groups', { params: { plan: id } });
}

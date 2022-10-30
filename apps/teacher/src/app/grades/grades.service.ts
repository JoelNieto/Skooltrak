import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ClassGroup,
  Course,
  Grade,
  Period,
  Student,
} from '@skooltrak-app/models';

@Injectable()
export class GradesService {
  http = inject(HttpClient);

  getCourses = () => this.http.get<Course[]>('/api/courses');

  getGroups = (plan: string) =>
    this.http.get<ClassGroup[]>('/api/class-groups', { params: { plan } });

  getStudents = (group: string) =>
    this.http.get<Student[]>('/api/students', { params: { group } });

  getPeriods = () => this.http.get<Period[]>('/api/periods');

  getGrades = (request: {
    course?: string;
    group?: string;
    period?: string;
  }) => {
    const { course, group, period } = request;
    return this.http.get<Grade[]>('/api/grades', {
      params: {
        course: course ?? '',
        group: group ?? '',
        period: period ?? '',
      },
    });
  };

  addGrade = (request: Partial<Grade>) =>
    this.http.post<Grade>('/api/grades', request);

  patchGrade = (id: string, request: Partial<Grade>) =>
    this.http.patch<Grade>(`/api/grades/${id}`, request);
}

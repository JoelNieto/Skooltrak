import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClassGroup, Grade, Period } from '@skooltrak-app/models';

@Injectable()
export class CoursesGradesService {
  private http = inject(HttpClient);

  getPeriods = () => this.http.get<Period[]>('/api/periods');

  getGroups = (id: string) =>
    this.http.get<ClassGroup[]>('/api/class-groups', { params: { plan: id } });

  getGrades = (course: string, period: string) =>
    this.http.get<Grade[]>('/api/grades', { params: { period, course } });
}

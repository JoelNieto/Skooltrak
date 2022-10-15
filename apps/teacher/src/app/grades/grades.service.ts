import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassGroup, Course, Student } from '@skooltrak-app/models';

@Injectable()
export class GradesService {
  constructor(private readonly http: HttpClient) {}

  getCourses = () => this.http.get<Course[]>('/api/courses');

  getGroups = (plan: string) =>
    this.http.get<ClassGroup[]>('/api/class-groups', { params: { plan } });

  getStudents = (group: string) =>
    this.http.get<Student[]>('/api/students', { params: { group } });
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StudyPlan, Subject, Teacher } from '@skooltrak-app/models';

@Injectable()
export class CoursesFormService {
  private http = inject(HttpClient);

  getSubjects = () => this.http.get<Subject[]>('/api/subjects');

  getPlans = () => this.http.get<StudyPlan[]>('/api/study-plans');

  getTeachers = () => this.http.get<Teacher[]>('/api/teachers');
}

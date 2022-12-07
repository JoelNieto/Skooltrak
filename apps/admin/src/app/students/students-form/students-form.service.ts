import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClassGroup, Degree, School, StudyPlan } from '@skooltrak-app/models';

@Injectable()
export class StudentsFormService {
  private http = inject(HttpClient);

  getAllSchools = () => this.http.get<School[]>('/api/schools');

  getDegrees = (id: string) =>
    this.http.get<Degree[]>(`/api/degrees/school/${id}`);

  getPlans = (id: string) =>
    this.http.get<StudyPlan[]>(`/api/study-plans/degree/${id}`);

  getGroups = (id: string) =>
    this.http.get<ClassGroup[]>(`/api/class-groups/plan/${id}`);
}

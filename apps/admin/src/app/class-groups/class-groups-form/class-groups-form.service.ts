import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudyPlan, Teacher } from '@skooltrak-app/models';

@Injectable()
export class ClassGroupsFormService {
  constructor(private readonly http: HttpClient) {}

  public getTeachers = () => this.http.get<Teacher[]>('/api/teachers');

  public getPlans = () => this.http.get<StudyPlan[]>('/api/study-plans');
}

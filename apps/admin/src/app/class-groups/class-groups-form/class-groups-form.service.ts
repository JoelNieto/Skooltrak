import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StudyPlan, Teacher } from '@skooltrak-app/models';

@Injectable()
export class ClassGroupsFormService {
  private http = inject(HttpClient);

  public getTeachers = () => this.http.get<Teacher[]>('/api/teachers');

  public getPlans = () => this.http.get<StudyPlan[]>('/api/study-plans');
}

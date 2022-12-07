import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StudyPlan } from '@skooltrak-app/models';

@Injectable()
export class StudyPlansService {
  private http = inject(HttpClient);

  public getAll = () => this.http.get<StudyPlan[]>('/api/study-plans');

  public get = (id: string) =>
    this.http.get<StudyPlan>(`/api/study-plans/${id}`);

  public post = (plan: StudyPlan) =>
    this.http.post<StudyPlan>('/api/study-plans', plan);

  public patch = (id: string, plan: Partial<StudyPlan>) =>
    this.http.patch<StudyPlan>(`/api/study-plans/${id}`, plan);

  public delete = (id: string) => this.http.delete(`/api/study-plans/${id}`);
}

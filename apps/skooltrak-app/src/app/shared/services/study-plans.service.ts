import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { EvaluationArea } from '../models/evaluation-areas.model';
import { ClassGroup, Course, StudyPlan } from '../models/studyplans.model';

@Injectable({ providedIn: 'root' })
export class StudyPlanService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'studyplans/';
  }

  public getAll() {
    return this.http.get<StudyPlan[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<StudyPlan>(`${this.url}${id}`);
  }

  public create(plan: StudyPlan) {
    return this.http.post<StudyPlan>(this.url, plan);
  }

  public getCourses(id: string) {
    return this.http.get<Course[]>(`${this.url}${id}/courses`);
  }

  public getGroups(id: string) {
    return this.http.get<ClassGroup[]>(`${this.url}${id}/groups`);
  }

  public getEvaluations(id: string) {
    return this.http.get<EvaluationArea[]>(`${this.url}${id}/Evaluations`);
  }

  public addEvaluationArea(id: string, area: EvaluationArea) {
    return this.http.post<EvaluationArea>(`${this.url}${id}/Evaluations`, area);
  }

  public editEvaluationArea(id: string, area: EvaluationArea) {
    return this.http.put(`${this.url}${id}/Evaluations`, area);
  }

  public deleteEvaluationArea(id: string) {
    return this.http.delete(`${this.url}${id}/Evaluations`);
  }

  public edit(id: string, plan: StudyPlan) {
    return this.http.put(`${this.url}${id}`, plan);
  }

  public copyCourses(ids: string[]) {
    return this.http.post(`${this.url}copy`, ids);
  }

  public copyCharges(ids: string[]) {
    return this.http.post(`${this.url}copy_charges`, ids);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

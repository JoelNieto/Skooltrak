import { Injectable } from '@angular/core';

import { StudyPlan, Course, ClassGroup } from '../models/studyplans.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class StudyPlanService {
  private url: string;

  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'studyplans';
  }

  public getAll() {
    return this.http.get<StudyPlan[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<StudyPlan>(this.url, id);
  }

  public create(plan: StudyPlan) {
    return this.http.post<StudyPlan>(this.url, plan);
  }

  public getCourses(id: string) {
    return this.http.get<Course[]>(`${this.url}/${id}/courses`);
  }

  public getGroups(id: string) {
    return this.http.get<ClassGroup[]>(`${this.url}/${id}/groups`);
  }

  public edit(id: string, plan: StudyPlan) {
    return this.http.edit(this.url, id, plan);
  }

  public copyCourses(ids: string[]) {
    return this.http.post(`${this.url}/copy`, ids);
  }

  public copyCharges(ids: string[]) {
    return this.http.post(`${this.url}/copy_charges`, ids);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

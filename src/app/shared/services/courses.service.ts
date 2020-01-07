import { Injectable } from '@angular/core';

import { Assignment } from '../models/assignments.model';
import { Grade } from '../models/grades.model';
import { ClassGroup, Course } from '../models/studyplans.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom.http.service';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'courses';
  }

  public getAll() {
    return this.http.get<Course[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Course>(this.url, id);
  }

  public getGroups(id: string) {
    return this.http.get<ClassGroup[]>(`${this.url}/${id}/groups`);
  }

  public getAssigments(id: string) {
    return this.http.get<Assignment[]>(`${this.url}/${id}/assignments`);
  }

  public getGrades(id: string) {
    return this.http.get<Grade[]>(`${this.url}/${id}/grades`);
  }

  public create(course: Course) {
    return this.http.post<Course>(this.url, course);
  }

  public edit(id: string, course: Course) {
    return this.http.edit(this.url, id, course);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

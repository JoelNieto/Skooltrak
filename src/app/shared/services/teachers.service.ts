import { Injectable } from '@angular/core';

import { ClassGroup, Course } from '../models/studyplans.model';
import { Teacher } from '../models/teachers.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';
import { Assignment } from '../models/assignments.model';

@Injectable({ providedIn: 'root' })
export class TeachersService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'teachers';
  }

  public getAll() {
    return this.http.get<Teacher[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Teacher>(this.url, id);
  }

  public getCourses(id: string) {
    return this.http.get<Course[]>(`${this.url}/${id}/courses`);
  }

  public getAssignments(id: string) {
    return this.http.get<Assignment[]>(`${this.url}/${id}/assignments`);
  }

  public getGroups(id: string) {
    return this.http.get<ClassGroup[]>(`${this.url}/${id}/groups`);
  }

  public create(teacher: Teacher) {
    return this.http.post<Teacher>(this.url, teacher);
  }

  public edit(id: string, teacher: Teacher) {
    return this.http.edit(this.url, id, teacher);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

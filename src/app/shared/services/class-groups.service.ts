import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { AttendanceSheet } from '../models/attendance.model';
import { Classroom } from '../models/classrooms.model';
import { Ranking } from '../models/rankings.model';
import { Student } from '../models/students.model';
import { ClassGroup, Course } from '../models/studyplans.model';

@Injectable({ providedIn: 'root' })
export class ClassGroupsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'classGroups/';
  }

  public getAll() {
    return this.http.get<ClassGroup[]>(this.url, { context: withCache() });
  }

  public get(id: string) {
    return this.http.get<ClassGroup>(`${this.url}${id}`);
  }

  public create(group: ClassGroup) {
    return this.http.post<ClassGroup>(this.url, group);
  }

  public edit(id: string, group: ClassGroup) {
    return this.http.put(`${this.url}${id}`, group);
  }

  public getRooms(id: string) {
    return this.http.get<Classroom[]>(`${this.url}${id}/rooms`);
  }

  public getRankings(id: string, periodId: string) {
    const params = new HttpParams().set('periodId', periodId);
    return this.http.get<Ranking[]>(`${this.url}${id}/Rankings`, {
      params,
      context: withCache(),
    });
  }

  public getStudents(id: string) {
    return this.http.get<Student[]>(`${this.url}${id}/students`, {
      context: withCache(),
    });
  }

  public getCourses(id: string) {
    return this.http.get<Course[]>(`${this.url}${id}/courses`);
  }

  public getAttendance(id: string) {
    return this.http.get<AttendanceSheet[]>(`${this.url}${id}/attendance`, {
      context: withCache(),
    });
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

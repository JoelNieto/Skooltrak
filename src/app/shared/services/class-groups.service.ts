import { Injectable } from '@angular/core';

import { AttendanceSheet } from '../models/attendance.model';
import { Classroom } from '../models/classrooms.model';
import { Student } from '../models/students.model';
import { ClassGroup, Course } from '../models/studyplans.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class ClassGroupsService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'classGroups';
  }

  public getAll() {
    return this.http.get<ClassGroup[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<ClassGroup>(this.url, id);
  }

  public create(group: ClassGroup) {
    return this.http.post<ClassGroup>(this.url, group);
  }

  public edit(id: string, group: ClassGroup) {
    return this.http.edit(this.url, id, group);
  }

  public getRooms(id: string) {
    return this.http.get<Classroom[]>(`${this.url}/${id}/rooms`);
  }

  public getStudents(id: string) {
    return this.http.get<Student[]>(`${this.url}/${id}/students`);
  }

  public getCourses(id: string) {
    return this.http.get<Course[]>(`${this.url}/${id}/courses`);
  }

  public getAttendance(id: string) {
    return this.http.get<AttendanceSheet[]>(`${this.url}/${id}/attendance`);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

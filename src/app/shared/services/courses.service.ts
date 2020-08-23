import { Injectable } from '@angular/core';

import { Assignment } from '../models/assignments.model';
import { Content } from '../models/content.model';
import { UploadFile } from '../models/documents.model';
import { Forum } from '../models/forums.model';
import { Grade, StudentGrade } from '../models/grades.model';
import { Student } from '../models/students.model';
import { ClassGroup, Course, CourseMessage } from '../models/studyplans.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';
import { Video } from '../models/videos.model';

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

  public getForums(id: string) {
    return this.http.get<Forum[]>(`${this.url}/${id}/forums`);
  }

  public getContent(id: string) {
    return this.http.get<Content[]>(`${this.url}/${id}/Contents`);
  }

  public getAssignments(id: string) {
    return this.http.get<Assignment[]>(`${this.url}/${id}/assignments`);
  }

  public getStudents(id: string) {
    return this.http.get<Student[]>(`${this.url}/${id}/Students`);
  }

  public getVideos(id: string) {
    return this.http.get<Video[]>(`${this.url}/${id}/Videos`);
  }

  public getDocuments(id: string) {
    return this.http.get<UploadFile[]>(`${this.url}/${id}/documents`);
  }

  public getScore(id: string, studentId: string) {
    return this.http.get<number>(`${this.url}/${id}/Score/${studentId}`);
  }

  public getGrades(id: string) {
    return this.http.get<Grade[]>(`${this.url}/${id}/grades`);
  }

  public getPeriodGrades(id: string, periodId: string) {
    return this.http.get<Grade[]>(`${this.url}/${id}/Grades/${periodId}`);
  }

  public closePeriod(course: Course) {
    return this.http.post<Course>(`${this.url}/ClosePeriod`, course);
  }

  public getStudentsGrades(id: string) {
    return this.http.get<StudentGrade[]>(`${this.url}/${id}/StudentsGrades`);
  }

  public getMessages(id: string) {
    return this.http.get<CourseMessage[]>(`${this.url}/${id}/messages`);
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

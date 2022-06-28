import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { Assignment } from '../models/assignments.model';
import { AttendanceSheet } from '../models/attendance.model';
import { Content } from '../models/content.model';
import { UploadFile } from '../models/documents.model';
import { Forum } from '../models/forums.model';
import { Grade, GradeStudent } from '../models/grades.model';
import { Period } from '../models/periods.model';
import { Student } from '../models/students.model';
import { ClassGroup, Course, CourseMessage } from '../models/studyplans.model';
import { Video } from '../models/videos.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private url: string;
  constructor(private http: HttpClient, private storage: StorageService) {
    this.url = environment.urlAPI + 'courses/';
  }

  public getAll() {
    return this.http.get<Course[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Course>(`${this.url}${id}`);
  }

  public getGroups(id: string) {
    return this.http.get<ClassGroup[]>(`${this.url}${id}/groups`);
  }

  public getForums(id: string) {
    return this.http.get<Forum[]>(`${this.url}${id}/forums`);
  }

  public getContent(id: string) {
    return this.http.get<Content[]>(`${this.url}${id}/Contents`);
  }

  public getAssignments(id: string) {
    return this.http.get<Assignment[]>(`${this.url}${id}/assignments`);
  }

  public getStudents(id: string) {
    return this.http.get<Student[]>(`${this.url}${id}/Students`);
  }

  public getVideos(id: string) {
    return this.http.get<Video[]>(`${this.url}${id}/Videos`);
  }

  public getDocuments(id: string) {
    return this.http.get<UploadFile[]>(`${this.url}${id}/documents`);
  }

  public getScore(id: string, studentId: string) {
    return this.http.get<number>(`${this.url}${id}/Score/${studentId}`);
  }

  public getPeriodScore(id: string, studentId: string, period: string) {
    const params = new HttpParams().append('periodId', period);
    return this.http.get<number>(`${this.url}${id}/PeriodScore/${studentId}`, {
      params,
    });
  }

  public getAttendance(id: string) {
    return this.http.get<AttendanceSheet[]>(`${this.url}${id}/Attendance`, {
      context: withCache(),
    });
  }

  public getIcon(course: Course): string {
    if (course.icon === null || !this.storage.getIcons().indexOf(course.icon)) {
      return 'assets/icons/course-learning.svg';
    }
    return `assets/icons/course-${course.icon}.svg`;
  }

  public getColor(course: Course): string {
    if (course.color === null) {
      return this.storage.getColors()[8];
    }
    return course.color;
  }

  public openPeriod(id: string, period: Period) {
    return this.http.put(`${this.url}${id}/OpenPeriod`, period);
  }

  public changeIcon(id: string, icon: string) {
    return this.http.put(`${this.url}${id}/ChangeIcon`, {
      id: icon,
    });
  }

  public changeColor(id: string, color: string) {
    return this.http.put(`${this.url}${id}/ChangeColor`, {
      id: color,
    });
  }

  public getGrades(id: string) {
    return this.http.get<Grade[]>(`${this.url}${id}/grades`);
  }

  public getPeriodGrades(id: string, periodId: string) {
    return this.http.get<Grade[]>(`${this.url}${id}/Grades/${periodId}`);
  }

  public closePeriod(course: Course) {
    return this.http.post<Course>(`${this.url}ClosePeriod`, course);
  }

  public getStudentsGrades(id: string, period: string) {
    const params = new HttpParams().append('periodId', period);
    return this.http.get<GradeStudent[]>(`${this.url}${id}/StudentsGrades`, {
      params,
      context: withCache(),
    });
  }

  public getMessages(id: string) {
    return this.http.get<CourseMessage[]>(`${this.url}${id}/messages`);
  }

  public create(course: Course) {
    return this.http.post<Course>(this.url, course);
  }

  public edit(id: string, course: Course) {
    return this.http.put(`${this.url}${id}`, course);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

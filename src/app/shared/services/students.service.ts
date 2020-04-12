import { Injectable } from '@angular/core';

import { Activity } from '../models/activities.model';
import { Assignment } from '../models/assignments.model';
import { AttendanceStudent } from '../models/attendance.model';
import { Charge } from '../models/charges.model';
import { Forum } from '../models/forums.model';
import { Payment } from '../models/payments.model';
import { QuizResult } from '../models/quizes.model';
import { Student, StudentSummary } from '../models/students.model';
import { Course } from '../models/studyplans.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  url: string;
  constructor(
    private http: CustomHttpService,
    private conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'students';
  }

  public getAll() {
    return this.http.get<StudentSummary[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Student>(this.url, id);
  }

  public getCount() {
    return this.http.get<number>(this.url + '/count');
  }

  public validateDocument(docId: string, currentId: string) {
    return this.http.post<boolean>(`${this.url}/validatedocument`, {
      documentId: docId,
      studentId: currentId,
    });
  }

  public getCharges(id: string) {
    return this.http.get<Charge[]>(`${this.url}/${id}/charges`);
  }

  public getPayments(id: string) {
    return this.http.get<Payment[]>(`${this.url}/${id}/payments`);
  }

  public getAssignments(id: string) {
    return this.http.get<Assignment[]>(`${this.url}/${id}/Assignments`);
  }

  public getQuizes(id: string) {
    return this.http.get<QuizResult[]>(`${this.url}/${id}/Quizes`);
  }

  public getActivities(id: string) {
    return this.http.get<Activity[]>(`${this.url}/${id}/Activity`);
  }

  public getAttendance(id: string) {
    return this.http.get<AttendanceStudent[]>(`${this.url}/${id}/attendance`);
  }

  public getCourses(id: string) {
    return this.http.get<Course[]>(`${this.url}/${id}/Courses`);
  }

  public getForums(id: string) {
    return this.http.get<Forum[]>(`${this.url}/${id}/Forums`);
  }

  public create(student: Student) {
    return this.http.post<Student>(this.url, student);
  }

  public edit(id: string, student: Student) {
    return this.http.edit(this.url, id, student);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

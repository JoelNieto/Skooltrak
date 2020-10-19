import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';

import { Activity } from '../models/activities.model';
import { Assignment } from '../models/assignments.model';
import { AttendanceStudent } from '../models/attendance.model';
import { UploadFile } from '../models/documents.model';
import { ExamResult } from '../models/exams.model';
import { Forum } from '../models/forums.model';
import { StudentGrade } from '../models/grades.model';
import { Charge, Payment } from '../models/payments.model';
import { QuizResult } from '../models/quizes.model';
import { Student, StudentSummary } from '../models/students.model';
import { ClassDay, Course, ParentSubject } from '../models/studyplans.model';
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

  public getList() {
    return this.http.get<Student[]>(this.url, 'list');
  }

  public getSchedule(id: string) {
    return this.http.get<ClassDay[]>(`${this.url}/${id}/Schedule`);
  }

  public getCount() {
    return this.http.get<number>(this.url + '/count');
  }

  public getTemporary() {
    return this.http.get<Student[]>(this.url + '/Temporary');
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

  public getGrades(id: string) {
    return this.http.get<StudentGrade[]>(`${this.url}/${id}/Grades`);
  }

  public getCourseGrades(id: string, courseId: string, period?: string) {
    const params = new HttpParams().append('periodId', period);
    return this.http.get<StudentGrade[]>(
      `${this.url}/${id}/Grades/${courseId}/Course`,
      null,
      params
    );
  }

  public getPeriodScore(id: string, period?: string) {
    const params = new HttpParams().append('periodId', period);
    return this.http.get<number>(`${this.url}/${id}`, 'Score', params);
  }

  public getCurrentScore(id: string) {
    return this.http.get<number>(`${this.url}/${id}`, 'Score');
  }

  public getPayments(id: string) {
    return this.http.get<Payment[]>(`${this.url}/${id}/payments`);
  }

  public getAssignments(id: string, dateFrom?: Date, dateTo?: Date) {
    let params: HttpParams;
    if (dateFrom) {
      params = new HttpParams()
        .set('dateFrom', format(dateFrom, 'dd-MM-yyyy'))
        .set('dateTo', format(dateTo, 'dd-MM-yyyy'));
    } else {
      params = new HttpParams();
    }
    return this.http.get<Assignment[]>(
      `${this.url}/${id}/Assignments`,
      null,
      params
    );
  }

  public getQuizes(id: string) {
    return this.http.get<QuizResult[]>(`${this.url}/${id}/Quizes`);
  }

  public getQuizResults(id: string) {
    return this.http.get<QuizResult[]>(`${this.url}/${id}/QuizResults`);
  }

  public getExams(id: string) {
    return this.http.get<ExamResult[]>(`${this.url}/${id}/Exams`);
  }

  public getExamResults(id: string) {
    return this.http.get<ExamResult[]>(`${this.url}/${id}/ExamResults`);
  }

  public getActivities(id: string) {
    return this.http.get<Activity[]>(`${this.url}/${id}/Activity`);
  }

  public getAttendance(id: string) {
    return this.http.get<AttendanceStudent[]>(`${this.url}/${id}/attendance`);
  }

  getDocuments(id: string) {
    return this.http.get<UploadFile[]>(`${this.url}/${id}/Documents`);
  }

  public getCourses(id: string, period?: string) {
    const params = new HttpParams().append('periodId', period);
    return this.http.get<Course[]>(`${this.url}/${id}/Courses`, null, params);
  }

  public getParentCourses(id: string, period?: string) {
    const params = new HttpParams().append('periodId', period);
    return this.http.get<ParentSubject[]>(
      `${this.url}/${id}/ParentCourses`,
      null,
      params
    );
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

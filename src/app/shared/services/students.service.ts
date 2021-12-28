import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Activity } from '../models/activities.model';
import { Assignment } from '../models/assignments.model';
import { AttendanceStudent } from '../models/attendance.model';
import { UploadFile } from '../models/documents.model';
import { ExamResult } from '../models/exams.model';
import { Forum } from '../models/forums.model';
import { GradeStudent } from '../models/grades.model';
import { Charge, Payment } from '../models/payments.model';
import { Period } from '../models/periods.model';
import { Evaluation } from '../models/prescholar.model';
import { QuizResult } from '../models/quizes.model';
import { StudentSkill } from '../models/skills.model';
import { ArchiveGrade, GradeSummary, PerformancePeriod, Student, StudentSummary } from '../models/students.model';
import { ClassDay, Course, ParentSubject } from '../models/studyplans.model';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'students/';
  }

  public getAll(): Observable<StudentSummary[]> {
    return this.http.get<StudentSummary[]>(this.url);
  }

  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + 'all', { context: withCache() });
  }

  public get(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.url}${id}`);
  }

  public getList(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + 'list', {
      context: withCache(),
    });
  }

  public getSchedule(id: string) {
    return this.http.get<ClassDay[]>(`${this.url}${id}/Schedule`, {
      context: withCache(),
    });
  }

  public getInactive() {
    return this.http.get<Student[]>(`${this.url}Inactive`, {
      context: withCache(),
    });
  }

  public getPerformance(id: string) {
    return this.http.get<PerformancePeriod[]>(`${this.url}${id}/Performance`);
  }

  public getSummary(id: string, period: Period) {
    return this.http.post<GradeSummary>(
      `${this.url}${id}/GradeSummary`,
      period
    );
  }

  public getArchiveYears(id: string) {
    return this.http.get<number[]>(`${this.url}${id}/Archives`);
  }

  public getArchiveGrades(id: string, year: number) {
    return this.http.get<ArchiveGrade[]>(
      `${this.url}${id}/Archives/${year.toString()}`,
      { context: withCache() }
    );
  }

  public getCount() {
    return this.http.get<number>(this.url + 'count');
  }

  public getTemporary() {
    return this.http.get<Student[]>(this.url + 'Temporary', {
      context: withCache(),
    });
  }

  public getSkills(id: string) {
    return this.http.get<StudentSkill[]>(`${this.url}${id}/Skills`);
  }

  public setSkill(id: string, skill: StudentSkill) {
    return this.http.post(`${this.url}${id}/Skills`, skill);
  }

  public getEvaluations(id: string) {
    return this.http.get<Evaluation[]>(`${this.url}${id}/Evaluations`);
  }
  public setEvaluations(id: string, item: Evaluation) {
    return this.http.post(`${this.url}${id}/Evaluations`, {
      evaluation: item,
    });
  }

  public validateDocument(docId: string, currentId: string) {
    return this.http.post<boolean>(`${this.url}validatedocument`, {
      documentId: docId,
      studentId: currentId,
    });
  }

  public getCharges(id: string) {
    return this.http.get<Charge[]>(`${this.url}${id}/charges`);
  }

  public getGrades(id: string) {
    return this.http.get<GradeStudent[]>(`${this.url}${id}/Grades`, {
      context: withCache(),
    });
  }

  public getCourseGrades(id: string, courseId: string, period?: string) {
    const params = new HttpParams().append('periodId', period);
    return this.http.get<GradeStudent[]>(
      `${this.url}${id}/Grades/${courseId}/Course`,
      { params, context: withCache() }
    );
  }

  public getPeriodScore(id: string, period?: string) {
    const params = new HttpParams().append('periodId', period);
    return this.http.get<number>(`${this.url}${id}/Score`, { params });
  }

  public getCurrentScore(id: string) {
    return this.http.get<number>(`${this.url}${id}/Score`);
  }

  public getPayments(id: string) {
    return this.http.get<Payment[]>(`${this.url}${id}/payments`);
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
    return this.http.get<Assignment[]>(`${this.url}${id}/Assignments`, {
      params,
      context: withCache(),
    });
  }

  public getQuizes(id: string) {
    return this.http.get<QuizResult[]>(`${this.url}${id}/Quizes`);
  }

  public getQuizResults(id: string) {
    return this.http.get<QuizResult[]>(`${this.url}${id}/QuizResults`);
  }

  public getExams(id: string) {
    return this.http.get<ExamResult[]>(`${this.url}${id}/Exams`);
  }

  public getExamResults(id: string) {
    return this.http.get<ExamResult[]>(`${this.url}${id}/ExamResults`);
  }

  public getActivities(id: string) {
    return this.http.get<Activity[]>(`${this.url}${id}/Activity`);
  }

  public getAttendance(id: string) {
    return this.http.get<AttendanceStudent[]>(`${this.url}${id}/attendance`);
  }

  getDocuments(id: string) {
    return this.http.get<UploadFile[]>(`${this.url}${id}/Documents`);
  }

  getByDocument(id: string) {
    return this.http.get<Student>(`${this.url}ByDocument/${id}`);
  }

  public getCourses(id: string, period?: string) {
    const params = new HttpParams().append('periodId', period);
    return this.http.get<Course[]>(`${this.url}${id}/Courses`, {
      params,
      context: withCache(),
    });
  }

  public getParentCourses(
    id: string,
    period: string
  ): Observable<ParentSubject[]> {
    const params = new HttpParams().append('periodId', period);
    return this.http.get<ParentSubject[]>(`${this.url}${id}/ParentCourses`, {
      params,
      context: withCache(),
    });
  }

  public getForums(id: string): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${this.url}${id}/Forums`);
  }

  public create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.url, student);
  }

  public edit(id: string, student: Student) {
    return this.http.put(`${this.url}${id}`, student);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`, { context: withCache() });
  }
}

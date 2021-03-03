import { Injectable } from '@angular/core';

import { Activity } from '../models/activities.model';
import { Assignment } from '../models/assignments.model';
import { Exam, ExamAssignation } from '../models/exams.model';
import { Forum } from '../models/forums.model';
import { Quiz, QuizAssignation } from '../models/quizes.model';
import { ClassGroup, Course } from '../models/studyplans.model';
import { TeacherClassDay } from '../models/teacher-class.model';
import { Teacher } from '../models/teachers.model';
import { Video } from '../models/videos.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

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

  public getQuizes(id: string) {
    return this.http.get<Quiz[]>(`${this.url}/${id}/Quizes`);
  }

  public getExams(id: string) {
    return this.http.get<Exam[]>(`${this.url}/${id}/Exams`);
  }

  public getExamAssignations(id: string) {
    return this.http.get<ExamAssignation[]>(`${this.url}/${id}/ExamAssignations`);
  }

  public getQuizAssignations(id: string) {
    return this.http.get<QuizAssignation[]>(`${this.url}/${id}/QuizAssignations`);
  }

  public getActivities(id: string) {
    return this.http.get<Activity[]>(`${this.url}/${id}/Activity`);
  }

  public getAllActivities(id: string) {
    return this.http.get<Activity[]>(`${this.url}/${id}/AllActivity`);
  }

  public getSchedule(id: string) {
    return this.http.get<TeacherClassDay[]>(`${this.url}/${id}/schedule`);
  }

  public getForums(id: string) {
    return this.http.get<Forum[]>(`${this.url}/${id}/forums`);
  }

  public getGroups(id: string) {
    return this.http.get<ClassGroup[]>(`${this.url}/${id}/groups`);
  }

  public getVideos(id: string) {
    return this.http.get<Video[]>(`${this.url}/${id}/Videos`);
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

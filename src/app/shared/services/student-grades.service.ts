import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { StudentGrade } from '../models/grades.model';

@Injectable({ providedIn: 'root' })
export class StudentGradesService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'grades/';
  }

  public getAll() {
    return this.http.get<StudentGrade[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<StudentGrade>(`${this.url}${id}`);
  }

  public create(grade: StudentGrade) {
    return this.http.post<StudentGrade>(this.url, grade);
  }

  public edit(id: string, grade: StudentGrade) {
    return this.http.put(`${this.url}${id}`, grade);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

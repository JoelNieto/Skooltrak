import { Injectable } from '@angular/core';

import { StudentGrade } from '../models/grades.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class StudentGradesService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'grades';
  }

  public getAll() {
    return this.http.get<StudentGrade[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<StudentGrade>(this.url, id);
  }

  public create(grade: StudentGrade) {
    return this.http.post<StudentGrade>(this.url, grade);
  }

  public edit(id: string, grade: StudentGrade) {
    return this.http.edit(this.url, id, grade);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

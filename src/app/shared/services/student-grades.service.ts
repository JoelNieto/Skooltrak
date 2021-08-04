import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { GradeStudent } from '../models/grades.model';

@Injectable({ providedIn: 'root' })
export class StudentGradesService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'grades/';
  }

  public getAll() {
    return this.http.get<GradeStudent[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<GradeStudent>(`${this.url}${id}`);
  }

  public create(grade: GradeStudent) {
    return this.http.post<GradeStudent>(this.url, grade);
  }

  public edit(id: string, grade: GradeStudent) {
    return this.http.put(`${this.url}${id}`, grade);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

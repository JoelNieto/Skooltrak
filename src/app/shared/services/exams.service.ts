import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { Exam, ExamAssignation } from '../models/exams.model';

@Injectable({ providedIn: 'root' })
export class ExamsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'exams/';
  }

  public getAll() {
    return this.http.get<Exam[]>(this.url, { context: withCache() });
  }

  public get(id: string) {
    return this.http.get<Exam>(`${this.url}${id}`);
  }

  public create(exam: Exam) {
    return this.http.post<Exam>(this.url, exam);
  }

  public getAssignations(id: string) {
    return this.http.get<ExamAssignation[]>(`${this.url}${id}/Assignations`);
  }

  public edit(id: string, exam: Exam) {
    return this.http.put(`${this.url}${id}`, exam);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

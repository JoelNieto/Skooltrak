import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ExamAssignation, ExamResult } from '../models/exams.model';

@Injectable({ providedIn: 'root' })
export class ExamAssignationsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'ExamAssignations/';
  }

  public getAll() {
    return this.http.get<ExamAssignation[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<ExamAssignation>(`${this.url}${id}`);
  }

  public create(exam: ExamAssignation) {
    return this.http.post<ExamAssignation>(this.url, exam);
  }

  public edit(id: string, exam: ExamAssignation) {
    return this.http.put(`${this.url}${id}`, exam);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }

  public getResults(id: string) {
    return this.http.get<ExamResult[]>(`${this.url}${id}/Results`);
  }
}

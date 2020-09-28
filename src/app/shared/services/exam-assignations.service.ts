import { Injectable } from '@angular/core';

import { ExamAssignation, ExamResult } from '../models/exams.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class ExamAssignationsService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'ExamAssignations';
  }

  public getAll() {
    return this.http.get<ExamAssignation[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<ExamAssignation>(this.url, id);
  }

  public create(exam: ExamAssignation) {
    return this.http.post<ExamAssignation>(this.url, exam);
  }

  public edit(id: string, exam: ExamAssignation) {
    return this.http.edit(this.url, id, exam);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }

  public getResults(id: string) {
    return this.http.get<ExamResult[]>(`${this.url}/${id}/Results`);
  }
}

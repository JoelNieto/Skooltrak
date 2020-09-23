import { Injectable } from '@angular/core';

import { Exam } from '../models/exams.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class ExamsService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'exams';
  }

  public getAll() {
    return this.http.get<Exam[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Exam>(this.url, id);
  }

  public create(exam: Exam) {
    return this.http.post<Exam>(this.url, exam);
  }

  public edit(id: string, exam: Exam) {
    return this.http.edit(this.url, id, exam);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

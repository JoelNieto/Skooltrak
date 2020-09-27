import { Injectable } from '@angular/core';

import { ExamResult } from '../models/exams.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class ExamResultsService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'ExamResults';
  }

  public get(id: string) {
    return this.http.get<ExamResult>(this.url, id);
  }

  public complete(id: string, result: ExamResult) {
    return this.http.edit(this.url, id, result);
  }
}

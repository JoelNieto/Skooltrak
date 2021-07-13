import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ExamResult } from '../models/exams.model';

@Injectable({ providedIn: 'root' })
export class ExamResultsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'ExamResults/';
  }

  public get(id: string) {
    return this.http.get<ExamResult>(`${this.url}${id}`);
  }

  public complete(id: string, result: ExamResult) {
    return this.http.put(`${this.url}${id}`, result);
  }
}

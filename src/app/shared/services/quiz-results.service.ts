import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { QuizResult } from '../models/quizes.model';

@Injectable({ providedIn: 'root' })
export class QuizResultsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'QuizResults/';
  }

  public get(id: string) {
    return this.http.get<QuizResult>(`${this.url}${id}`);
  }

  public complete(id: string, result: QuizResult) {
    return this.http.put(`${this.url}${id}`, result);
  }
}

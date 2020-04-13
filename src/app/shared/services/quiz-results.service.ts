import { Injectable } from '@angular/core';

import { QuizResult } from '../models/quizes.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class QuizResultsService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'QuizResults';
  }

  public get(id: string) {
    return this.http.get<QuizResult>(this.url, id);
  }

  public complete(id: string, result: QuizResult) {
    return this.http.edit(this.url, id, result);
  }
}

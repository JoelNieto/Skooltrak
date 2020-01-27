import { Injectable } from '@angular/core';

import { Quiz } from '../models/quizes.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class QuizesService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'quizes';
  }

  public getAll() {
    return this.http.get<Quiz[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Quiz>(this.url, id);
  }

  public create(quiz: Quiz) {
    return this.http.post<Quiz>(this.url, quiz);
  }

  public edit(id: string, quiz: Quiz) {
    return this.http.edit(this.url, id, quiz);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

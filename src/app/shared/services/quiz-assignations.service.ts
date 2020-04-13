import { Injectable } from '@angular/core';

import { QuizAssignation, QuizResult } from '../models/quizes.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class QuizesAssignationsService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'QuizAssignations';
  }

  public getAll() {
    return this.http.get<QuizAssignation[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<QuizAssignation>(this.url, id);
  }

  public getResults(id: string) {
    return this.http.get<QuizResult[]>(`${this.url}/${id}/Results`);
  }

  public create(quiz: QuizAssignation) {
    return this.http.post<QuizAssignation>(this.url, quiz);
  }

  public edit(id: string, quiz: QuizAssignation) {
    return this.http.edit(this.url, id, quiz);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

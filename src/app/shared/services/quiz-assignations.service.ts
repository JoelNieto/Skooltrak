import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { QuizAssignation, QuizResult } from '../models/quizes.model';

@Injectable({ providedIn: 'root' })
export class QuizesAssignationsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'QuizAssignations/';
  }

  public getAll() {
    return this.http.get<QuizAssignation[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<QuizAssignation>(`${this.url}${id}`);
  }

  public getResults(id: string) {
    return this.http.get<QuizResult[]>(`${this.url}${id}/Results`);
  }

  public create(quiz: QuizAssignation) {
    return this.http.post<QuizAssignation>(this.url, quiz);
  }

  public edit(id: string, quiz: QuizAssignation) {
    return this.http.put(`${this.url}${id}`, quiz);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

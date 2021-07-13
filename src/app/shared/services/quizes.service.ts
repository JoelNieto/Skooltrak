import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { Quiz } from '../models/quizes.model';

@Injectable({ providedIn: 'root' })
export class QuizesService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'quizes/';
  }

  public getAll() {
    return this.http.get<Quiz[]>(this.url, { context: withCache() });
  }

  public get(id: string) {
    return this.http.get<Quiz>(`${this.url}${id}`);
  }

  public create(quiz: Quiz) {
    return this.http.post<Quiz>(this.url, quiz);
  }

  public edit(id: string, quiz: Quiz) {
    return this.http.put(`${this.url}${id}`, quiz);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

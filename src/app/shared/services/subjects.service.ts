import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Subject } from '../models/subjects.model';

@Injectable({ providedIn: 'root' })
export class SubjectsService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'subjects/';
  }

  getAll() {
    return this.http.get<Subject[]>(this.url);
  }

  get(id: string) {
    return this.http.get<Subject>(`${this.url}${id}`);
  }

  create(subject: Subject) {
    return this.http.post<Subject>(this.url, subject);
  }

  edit(id: string, subject: Subject) {
    return this.http.put(`${this.url}${id}`, subject);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

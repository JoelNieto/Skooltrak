import { Injectable } from '@angular/core';

import { Subject } from '../models/subjects.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom.http.service';

@Injectable({ providedIn: 'root' })
export class SubjectsService {
  url: string;
  constructor(
    private http: CustomHttpService,
    private conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'subjects';
  }

  getAll() {
    return this.http.get<Subject[]>(this.url);
  }

  get(id: string) {
    return this.http.get<Subject>(this.url, id);
  }

  create(subject: Subject) {
    return this.http.post<Subject>(this.url, subject);
  }

  edit(id: string, subject: Subject) {
    return this.http.edit(this.url, id, subject);
  }

  delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

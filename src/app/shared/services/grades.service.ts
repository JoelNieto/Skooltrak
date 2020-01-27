import { Injectable } from '@angular/core';

import { Grade } from '../models/grades.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class GradesService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'grades';
  }

  public getAll() {
    return this.http.get<Grade[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Grade>(this.url, id);
  }

  public create(grade: Grade) {
    return this.http.post<Grade>(this.url, grade);
  }

  public edit(id: string, grade: Grade) {
    return this.http.edit(this.url, id, grade);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

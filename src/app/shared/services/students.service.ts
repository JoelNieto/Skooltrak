import { Injectable } from '@angular/core';

import { Student } from '../models/students.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom.http.service';
import { Charge } from '../models/charges.model';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  url: string;
  constructor(
    private http: CustomHttpService,
    private conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'students';
  }

  public getAll() {
    return this.http.get<Student[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Student>(this.url, id);
  }

  public getCharges(id: string) {
    return this.http.get<Charge[]>(`${this.url}/${id}/charges`);
  }

  public create(student: Student) {
    return this.http.post<Student>(this.url, student);
  }

  public edit(id: string, student: Student) {
    return this.http.edit(this.url, id, student);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

import { Injectable } from '@angular/core';

import { Charge } from '../models/charges.model';
import { Payment } from '../models/payments.model';
import { Student, StudentSummary } from '../models/students.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

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
    return this.http.get<StudentSummary[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Student>(this.url, id);
  }

  public getCount() {
    return this.http.get<number>(this.url + '/count');
  }

  public validateDocument(docId: string, currentId: string) {
    return this.http.post<boolean>(`${this.url}/validatedocument`, {
      documentId: docId,
      studentId: currentId
    });
  }

  public getCharges(id: string) {
    return this.http.get<Charge[]>(`${this.url}/${id}/charges`);
  }

  public getPayments(id: string) {
    return this.http.get<Payment[]>(`${this.url}/${id}/payments`);
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

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GroupedCredit } from '../models/credits.model';
import { ConnectionService } from './connection.service';
import { StudentsService } from './students.service';

@Injectable({ providedIn: 'root' })
export class CreditsService {
  private url: string;
  constructor(
    private http: HttpClient,
    private conn: ConnectionService,
    private studentsService: StudentsService
  ) {
    this.url = conn.urlAPI;
  }

  public getCredits(documentId: string) {
    const params = new HttpParams().set('documentId', documentId);
    return this.http.get<GroupedCredit[]>(this.url, { params });
  }

  async generatePDF(studentId: string) {
    const student = await this.studentsService.get(studentId).toPromise();
    const credits = await this.getCredits(student.documentId).toPromise();
  }
}

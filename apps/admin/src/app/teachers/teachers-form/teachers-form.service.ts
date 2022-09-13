import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '@skooltrak-app/models';

@Injectable()
export class TeachersFormService {
  constructor(private http: HttpClient) {}

  getSubjects = () => this.http.get<Subject[]>('/api/subjects');
}

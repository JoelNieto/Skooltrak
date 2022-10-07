import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '@skooltrak-app/models';

@Injectable()
export class StudentsDetailsService {
  constructor(public http: HttpClient) {}

  getStudent = (id?: string) => this.http.get<Student>(`/api/students/${id}`);
}

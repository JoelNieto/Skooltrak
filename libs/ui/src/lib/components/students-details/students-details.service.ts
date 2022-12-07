import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Student } from '@skooltrak-app/models';

@Injectable()
export class StudentsDetailsService {
  private http = inject(HttpClient);

  getStudent = (id?: string) => this.http.get<Student>(`/api/students/${id}`);
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '@skooltrak-app/models';

@Injectable()
export class GroupsStudentsService {
  constructor(private readonly http: HttpClient) {}

  public getStudents = (id: string) =>
    this.http.get<Student[]>('/api/students', { params: { group: id } });
}

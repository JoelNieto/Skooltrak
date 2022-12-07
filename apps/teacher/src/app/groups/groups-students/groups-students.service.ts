import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Student } from '@skooltrak-app/models';

@Injectable()
export class GroupsStudentsService {
  private http = inject(HttpClient);

  public getStudents = (id: string) =>
    this.http.get<Student[]>('/api/students', { params: { group: id } });
}

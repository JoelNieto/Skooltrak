import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';
import { ClassGroup } from '../models/studyplans.model';
import { Student } from '../models/students.model';

@Injectable({ providedIn: 'root' })
export class ClassGroupsService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'classgroups';
  }

  public getAll() {
    return this.http.get<ClassGroup[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<ClassGroup>(this.url, id);
  }

  public create(group: ClassGroup) {
    return this.http.post<ClassGroup>(this.url, group);
  }

  public edit(id: string, group: ClassGroup) {
    return this.http.edit(this.url, id, group);
  }

  public getStudents(id: string) {
    return this.http.get<Student[]>(`${this.url}/${id}/students`);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Grade } from '../models/grades.model';

@Injectable({ providedIn: 'root' })
export class GradesService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'grades/';
  }

  public getAll() {
    return this.http.get<Grade[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Grade>(`${this.url}${id}`);
  }

  public create(grade: Grade) {
    return this.http.post<Grade>(this.url, grade);
  }

  public publish(id: string) {
    return this.http.get(`${this.url}${id}/Publish`);
  }

  public edit(id: string, grade: Grade) {
    return this.http.put(`${this.url}${id}`, grade);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

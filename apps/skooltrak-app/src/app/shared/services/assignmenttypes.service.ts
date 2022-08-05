import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AssignmentType } from '../models/assignments.model';

@Injectable({ providedIn: 'root' })
export class AssignmentTypesService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'assignmenttypes/';
  }

  public getAll() {
    return this.http.get<AssignmentType[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<AssignmentType>(`${this.url}${id}`);
  }

  public create(type: AssignmentType) {
    return this.http.post<AssignmentType>(this.url, type);
  }

  public edit(id: string, type: AssignmentType) {
    return this.http.put(`${this.url}${id}`, type);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

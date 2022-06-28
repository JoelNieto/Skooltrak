import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Degree } from '../models/studyplans.model';

@Injectable({ providedIn: 'root' })
export class DegreesService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'degrees/';
  }

  public getAll() {
    return this.http.get<Degree[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Degree>(`${this.url}${id}`);
  }

  public create(degree: Degree) {
    return this.http.post<Degree>(this.url, degree);
  }

  public edit(id: string, degree: Degree) {
    return this.http.put(`${this.url}${id}`, degree);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

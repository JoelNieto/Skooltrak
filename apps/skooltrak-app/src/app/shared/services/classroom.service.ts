import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Classroom } from '../models/classrooms.model';

@Injectable({ providedIn: 'root' })
export class ClassroomsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'classrooms/';
  }

  public getPublicRooms() {
    return this.http.get<Classroom[]>(this.url);
  }
  public getAll() {
    return this.http.get<Classroom[]>(`${this.url}all`);
  }

  public get(id: string) {
    return this.http.get<Classroom>(`${this.url}${id}`);
  }

  public create(room: Classroom) {
    return this.http.post<Classroom>(this.url, room);
  }

  public edit(id: string, room: Classroom) {
    return this.http.put(`${this.url}${id}`, room);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

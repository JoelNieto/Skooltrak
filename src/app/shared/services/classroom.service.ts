import { Injectable } from '@angular/core';
import { Classroom } from '../models/classrooms.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class ClassroomsService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'classrooms';
  }

  public getPublicRooms() {
    return this.http.get<Classroom[]>(this.url);
  }
  public getAll() {
    return this.http.get<Classroom[]>(this.url, 'all');
  }

  public get(id: string) {
    return this.http.get<Classroom>(this.url, id);
  }

  public create(room: Classroom) {
    return this.http.post<Classroom>(this.url, room);
  }

  public edit(id: string, room: Classroom) {
    return this.http.edit(this.url, id, room);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

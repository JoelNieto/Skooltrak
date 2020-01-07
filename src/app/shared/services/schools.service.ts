import { Injectable } from '@angular/core';

import { School } from '../models/schools.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom.http.service';

@Injectable({ providedIn: 'root' })
export class SchoolsService {
  url: string;
  constructor(
    private http: CustomHttpService,
    private readonly conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'schools';
  }

  getAll() {
    console.log('Schools');
    return this.http.get<School[]>(this.url);
  }

  get(id: string) {
    return this.http.get<School>(this.url, id);
  }

  create(school: School) {
    return this.http.post<School>(this.url, school);
  }

  edit(id: string, school: School) {
    return this.http.edit(this.url, id, school);
  }

  delete(id: string) {
    return this.http.delete(this.url, id);
  }
}
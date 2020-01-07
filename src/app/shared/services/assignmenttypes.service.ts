import { Injectable } from '@angular/core';

import { AssignmentType } from '../models/assignments.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom.http.service';

@Injectable({ providedIn: 'root' })
export class AssignmentTypesService {
  url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'assignmenttypes';
  }

  public getAll() {
    return this.http.get<AssignmentType[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<AssignmentType>(this.url, id);
  }

  public create(type: AssignmentType) {
    return this.http.post<AssignmentType>(this.url, type);
  }

  public edit(id: string, type: AssignmentType) {
    return this.http.edit(this.url, id, type);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

import { Injectable } from '@angular/core';

import { Assignment } from '../models/assignments.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'assignments';
  }

  public getAll() {
    return this.http.get<Assignment[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Assignment>(this.url, id);
  }

  public create(assignment: Assignment) {
    return this.http.post<Assignment>(this.url, assignment);
  }

  public edit(id: string, assignment: Assignment) {
    return this.http.edit(this.url, id, assignment);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

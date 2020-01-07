import { Injectable } from '@angular/core';
import { Degree } from '../models/studyplans.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom.http.service';

@Injectable({ providedIn: 'root' })
export class DegreesService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'degrees';
  }

  public getAll() {
    return this.http.get<Degree[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Degree>(this.url, id);
  }

  public create(degree: Degree) {
    return this.http.post<Degree>(this.url, degree);
  }

  public edit(id: string, degree: Degree) {
    return this.http.edit(this.url, id, degree);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

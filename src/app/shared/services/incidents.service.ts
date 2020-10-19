import { Injectable } from '@angular/core';

import { Incident, IncidentUpdate } from '../models/incidents.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({
  providedIn: 'root',
})
export class IncidentsService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'incidents';
  }

  public getAll() {
    return this.http.get<Incident[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Incident>(this.url, id);
  }

  public create(incident: Incident) {
    return this.http.post<Incident>(this.url, incident);
  }

  public edit(id: string, incident: Incident) {
    return this.http.edit(this.url, id, incident);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }

  public update(id: string, update: IncidentUpdate) {
    return this.http.post(`${this.url}/${id}/Update`, update);
  }
}

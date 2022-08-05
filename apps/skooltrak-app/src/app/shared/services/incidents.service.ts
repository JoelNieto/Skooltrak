import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Incident, IncidentUpdate } from '../models/incidents.model';

@Injectable({
  providedIn: 'root',
})
export class IncidentsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'incidents/';
  }

  public getAll() {
    return this.http.get<Incident[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Incident>(`${this.url}${id}`);
  }

  public create(incident: Incident) {
    return this.http.post<Incident>(this.url, incident);
  }

  public edit(id: string, incident: Incident) {
    return this.http.put(`${this.url}${id}`, incident);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }

  public update(id: string, update: IncidentUpdate) {
    return this.http.post(`${this.url}${id}/Update`, update);
  }
}

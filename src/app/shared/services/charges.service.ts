import { Injectable } from '@angular/core';

import { Charge, Summary } from '../models/charges.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class ChargesService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'charges';
  }

  public getAll() {
    return this.http.get<Charge[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Charge>(this.url, id);
  }

  public getDue() {
    return this.http.get<Summary[]>(`${this.url}/due`);
  }

  public getBalances() {
    return this.http.get<Summary[]>(`${this.url}/balance`);
  }

  public create(charge: Charge) {
    return this.http.post<Charge>(this.url, charge);
  }

  public edit(id: string, charge: Charge) {
    return this.http.edit(this.url, id, charge);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

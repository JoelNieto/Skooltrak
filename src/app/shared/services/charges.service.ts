import { Injectable } from '@angular/core';

import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom.http.service';
import { Charge } from '../models/charges.model';

@Injectable({ providedIn: 'root' })
export class ChargeesService {
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

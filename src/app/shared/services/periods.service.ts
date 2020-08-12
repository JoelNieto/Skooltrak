import { Injectable } from '@angular/core';

import { Period } from '../models/periods.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class PeriodsService {
  private url: string;
  constructor(
    private http: CustomHttpService,
    private conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'periods';
  }

  public getAll() {
    return this.http.get<Period[]>(this.url);
  }

  public create(period: Period) {
    return this.http.post<Period>(this.url, period);
  }

  public edit(id: string, period: Period) {
    return this.http.edit(this.url, id, period);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

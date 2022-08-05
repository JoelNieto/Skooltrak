import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { Period } from '../models/periods.model';

@Injectable({ providedIn: 'root' })
export class PeriodsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'periods/';
  }

  public getAll() {
    return this.http.get<Period[]>(this.url, {
      context: withCache({ ttl: 36000000 }),
    });
  }

  public create(period: Period) {
    return this.http.post<Period>(this.url, period);
  }

  public edit(id: string, period: Period) {
    return this.http.put(`${this.url}${id}`, period);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

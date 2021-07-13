import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { Summary } from '../models/charges.model';
import { Charge } from '../models/payments.model';

@Injectable({ providedIn: 'root' })
export class ChargesService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'charges/';
  }

  public getAll() {
    return this.http.get<Charge[]>(this.url, { context: withCache() });
  }

  public get(id: string) {
    return this.http.get<Charge>(`${this.url}${id}`);
  }

  public getDue() {
    return this.http.get<Summary[]>(`${this.url}due`);
  }

  public getBalances() {
    return this.http.get<Summary[]>(`${this.url}balance`);
  }

  public getTotalDue() {
    return this.http.get<number>(`${this.url}totaldue`);
  }

  public getTotalCurrent() {
    return this.http.get<number>(`${this.url}totalcurrent`);
  }

  public create(charge: Charge) {
    return this.http.post<Charge>(this.url, charge);
  }

  public edit(id: string, charge: Charge) {
    return this.http.put(`${this.url}${id}`, charge);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

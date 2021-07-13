import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { PaymentDay } from '../models/charges.model';

@Injectable({ providedIn: 'root' })
export class PaymentDayService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'paymentdays/';
  }

  public getAll() {
    return this.http.get<PaymentDay[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<PaymentDay>(`${this.url}${id}`);
  }

  public create(day: PaymentDay) {
    return this.http.post<PaymentDay>(this.url, day);
  }

  public edit(id: string, day: PaymentDay) {
    return this.http.put(`${this.url}${id}`, day);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { StudentBalance } from '../models/collection-report.model';
import { Payment } from '../models/payments.model';

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  private url: string;
  constructor(private readonly http: HttpClient) {
    this.url = environment.urlAPI + 'payments/';
  }

  public getAll() {
    return this.http.get<Payment[]>(this.url, { context: withCache() });
  }

  public get(id: string) {
    return this.http.get<Payment>(`${this.url}${id}`);
  }

  public getBalances() {
    return this.http.get<StudentBalance[]>(this.url + 'students');
  }

  public create(payment: Payment) {
    return this.http.post<Payment>(this.url, payment);
  }

  public edit(id: string, payment: Payment) {
    return this.http.put(`${this.url}${id}`, payment);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

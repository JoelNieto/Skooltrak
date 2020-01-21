import { Injectable } from '@angular/core';

import { Payment } from '../models/payments.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  private url: string;
  constructor(
    private readonly conn: ConnectionService,
    private readonly http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'payments';
  }

  public getAll() {
    return this.http.get<Payment[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Payment>(this.url, id);
  }

  public create(payment: Payment) {
    return this.http.post<Payment>(this.url, payment);
  }

  public edit(id: string, payment: Payment) {
    return this.http.edit(this.url, id, payment);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

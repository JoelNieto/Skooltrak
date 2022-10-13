import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Period } from '@skooltrak-app/models';

@Injectable()
export class PeriodsService {
  constructor(private readonly http: HttpClient) {}

  public getAll = () => this.http.get<Period[]>('/api/periods');

  public get = (id: string) => this.http.get<Period>(`/api/periods/${id}`);

  public post = (period: Partial<Period>) =>
    this.http.post<Period>('/api/periods', period);

  public patch = (id: string, period: Partial<Period>) =>
    this.http.patch<Period>(`/api/periods/${id}`, period);

  public delete = (id: string) => this.http.delete(`/api/periods/${id}`);
}

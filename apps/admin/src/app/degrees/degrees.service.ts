import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Degree } from '@skooltrak-app/models';

@Injectable()
export class DegreesService {
  private http = inject(HttpClient);

  public getAll = () => this.http.get<Degree[]>('/api/degrees');

  public get = (id: string) => this.http.get<Degree>(`/api/degrees/${id}`);

  public post = (degree: Degree) =>
    this.http.post<Degree>('/api/degrees', degree);

  public patch = (id: string, degree: Partial<Degree>) =>
    this.http.patch<Degree>(`/api/degrees/${id}`, degree);

  public delete = (id: string) => this.http.delete(`/api/degrees/${id}`);
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { Country } from '../models/countries.model';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'countries/';
  }

  public getAll() {
    return this.http.get<Country[]>(this.url, { context: withCache() });
  }

  public get(id: string) {
    return this.http.get<Country>(`${this.url}${id}`);
  }

  public create(country: Country) {
    return this.http.post<Country>(this.url, country);
  }

  public edit(id: string, country: Country) {
    return this.http.put(`${this.url}${id}`, country);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

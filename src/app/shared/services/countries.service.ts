import { Injectable } from '@angular/core';

import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom.http.service';
import { Country } from '../models/countries.model';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'countries';
  }

  public getAll() {
    return this.http.get<Country[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Country>(this.url, id);
  }

  public create(country: Country) {
    return this.http.post<Country>(this.url, country);
  }

  public edit(id: string, country: Country) {
    return this.http.edit(this.url, id, country);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

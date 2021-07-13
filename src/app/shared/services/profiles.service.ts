import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { Profile } from '../models/users.model';

@Injectable({ providedIn: 'root' })
export class ProfilesServices {
  private url: string;
  constructor(private readonly http: HttpClient) {
    this.url = environment.urlAPI + 'profiles/';
  }

  public getAll() {
    return this.http.get<Profile[]>(this.url, { context: withCache() });
  }

  public get(id: string) {
    return this.http.get<Profile>(`${this.url}${id}`, { context: withCache() });
  }

  public create(profile: Profile) {
    return this.http.post<Profile>(this.url, profile);
  }

  public edit(id: string, profile: Profile) {
    return this.http.put(`${this.url}${id}`, profile);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

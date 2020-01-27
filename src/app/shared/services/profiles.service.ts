import { Injectable } from '@angular/core';

import { Profile } from '../models/users.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class ProfilesServices {
  private url: string;
  constructor(
    private readonly http: CustomHttpService,
    private readonly conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'profiles';
  }

  public getAll() {
    return this.http.get<Profile[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Profile>(this.url, id);
  }

  public create(profile: Profile) {
    return this.http.post<Profile>(this.url, profile);
  }

  public edit(id: string, profile: Profile) {
    return this.http.edit(this.url, id, profile);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

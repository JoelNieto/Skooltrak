import { Injectable } from '@angular/core';

import { Access } from '../models/users.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class AccessService {
  private url: string;
  constructor(
    private http: CustomHttpService,
    private conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'access';
  }

  public getAll() {
    return this.http.get<Access[]>(this.url);
  }
}

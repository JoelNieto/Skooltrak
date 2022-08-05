import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Access } from '../models/users.model';

@Injectable({ providedIn: 'root' })
export class AccessService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'access';
  }

  public getAll() {
    return this.http.get<Access[]>(this.url);
  }
}

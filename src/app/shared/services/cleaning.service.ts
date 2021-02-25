import { Injectable } from '@angular/core';
import { CleaningItem } from '../models/cleaning.model';

import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class CleaningService {
  private url: string;
  constructor(
    private http: CustomHttpService,
    private conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'cleaning';
  }

  public getItems() {
    return this.http.get<CleaningItem[]>(this.url + '/items');
  }

  public runCleaning(items: CleaningItem[]) {
    return this.http.post(this.url, items);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CleaningItem } from '../models/cleaning.model';

@Injectable({ providedIn: 'root' })
export class CleaningService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'cleaning';
  }

  public getItems() {
    return this.http.get<CleaningItem[]>(this.url + '/items');
  }

  public runCleaning(items: CleaningItem[]) {
    return this.http.post(this.url, items);
  }
}

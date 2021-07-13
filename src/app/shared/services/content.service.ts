import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { Content } from '../models/content.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'Content/';
  }

  public getAll() {
    return this.http.get<Content[]>(this.url, { context: withCache() });
  }

  public get(id: string) {
    return this.http.get<Content>(`${this.url}${id}`);
  }

  public edit(id: string, content: Content) {
    return this.http.put(`${this.url}${id}`, content);
  }

  public create(content: Content) {
    return this.http.post<Content>(this.url, content);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

import { Injectable } from '@angular/core';

import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';
import { Content } from '../models/content.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'Content';
  }

  public getAll() {
    return this.http.get<Content[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Content>(this.url, id);
  }

  public edit(id: string, content: Content) {
    return this.http.edit(this.url, id, content);
  }

  public create(content: Content) {
    return this.http.post<Content>(this.url, content);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

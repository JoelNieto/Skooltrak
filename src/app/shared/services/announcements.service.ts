import { Injectable } from '@angular/core';

import { Announcement } from '../models/announcements.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private url: string;

  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'announcements';
  }

  public getAll() {
    return this.http.get<Announcement[]>(this.url + '/all');
  }

  public get(id: string) {
    return this.http.get<Announcement>(this.url, id);
  }

  public create(announcement: Announcement) {
    return this.http.post<Announcement>(this.url, announcement);
  }

  public edit(id: string, announcement: Announcement) {
    return this.http.edit(this.url, id, announcement);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

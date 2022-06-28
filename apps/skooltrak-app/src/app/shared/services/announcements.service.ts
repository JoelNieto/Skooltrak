import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Announcement } from '../models/announcements.model';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'announcements';
  }

  public getAll() {
    return this.http.get<Announcement[]>(this.url + '/all');
  }

  public get(id: string) {
    return this.http.get<Announcement>(`${this.url}${id}`);
  }

  public create(announcement: Announcement) {
    return this.http.post<Announcement>(this.url, announcement);
  }

  public edit(id: string, announcement: Announcement) {
    return this.http.put(`${this.url}${id}`, announcement);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

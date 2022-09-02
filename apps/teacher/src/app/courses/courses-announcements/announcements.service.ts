import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from '@skooltrak-app/models';

@Injectable()
export class AnnouncementsService {
  constructor(private http: HttpClient) {}

  getAll = (id: string) =>
    this.http.get<Announcement[]>('/api/announcements', {
      params: { course: id },
    });

  post = (item?: Announcement) =>
    this.http.post<Announcement>('/api/announcements', item);
}

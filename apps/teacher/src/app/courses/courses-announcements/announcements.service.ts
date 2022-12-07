import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Announcement } from '@skooltrak-app/models';

@Injectable()
export class AnnouncementsService {
  private http = inject(HttpClient);

  getAll = (id: string) =>
    this.http.get<Announcement[]>('/api/announcements', {
      params: { course: id },
    });

  post = (item?: Announcement) =>
    this.http.post<Announcement>('/api/announcements', item);
}

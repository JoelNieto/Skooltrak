import { Injectable } from '@angular/core';

import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';
import { Video } from '../models/videos.model';

@Injectable({ providedIn: 'root' })
export class VideosService {
  url: string;
  constructor(
    private http: CustomHttpService,
    private readonly conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'Videos';
  }

  getAll() {
    return this.http.get<Video[]>(this.url);
  }

  get(id: string) {
    return this.http.get<Video>(this.url, id);
  }

  getDefault() {
    return this.http.get<Video>(this.url, 'default');
  }

  create(video: Video) {
    return this.http.post<Video>(this.url, video);
  }

  edit(id: string, video: Video) {
    return this.http.edit(this.url, id, video);
  }

  delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

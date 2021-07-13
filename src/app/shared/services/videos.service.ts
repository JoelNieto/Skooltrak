import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { Video } from '../models/videos.model';

@Injectable({ providedIn: 'root' })
export class VideosService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'Videos/';
  }

  getAll() {
    return this.http.get<Video[]>(this.url, { context: withCache() });
  }

  get(id: string) {
    return this.http.get<Video>(`${this.url}${id}`);
  }

  getDefault() {
    return this.http.get<Video>(this.url + 'default');
  }

  create(video: Video) {
    return this.http.post<Video>(this.url, video);
  }

  edit(id: string, video: Video) {
    return this.http.put(`${this.url}${id}`, video);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

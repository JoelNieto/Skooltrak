import { Injectable } from '@angular/core';

import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';
import { Forum, ForumPost } from '../models/forums.model';

@Injectable({ providedIn: 'root' })
export class ForumsService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'forums';
  }

  public getAll() {
    return this.http.get<Forum[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Forum>(this.url, id);
  }

  public create(forum: Forum) {
    return this.http.post<Forum>(this.url, forum);
  }

  public edit(id: string, forum: Forum) {
    return this.http.edit(this.url, id, forum);
  }

  public getPosts(id: string) {
    return this.http.get<ForumPost[]>(`${this.url}/${id}/posts`);
  }

  public addPost(id: string, post: ForumPost) {
    return this.http.post<ForumPost>(`${this.url}/${id}`, post);
  }


  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { UploadFile } from '../models/documents.model';
import { Forum, ForumPost } from '../models/forums.model';

@Injectable({ providedIn: 'root' })
export class ForumsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'forums/';
  }

  public getAll() {
    return this.http.get<Forum[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Forum>(`${this.url}${id}`);
  }

  public getDocuments(id: string) {
    return this.http.get<UploadFile[]>(`${this.url}${id}/Documents`);
  }

  public create(forum: Forum) {
    return this.http.post<Forum>(this.url, forum);
  }

  public edit(id: string, forum: Forum) {
    return this.http.put(`${this.url}${id}`, forum);
  }

  public getPosts(id: string) {
    return this.http.get<ForumPost[]>(`${this.url}${id}/posts`);
  }

  public addPost(id: string, post: ForumPost) {
    return this.http.post<ForumPost>(`${this.url}${id}`, post);
  }

  public getHub() {
    return this.http.get<ForumPost>(environment.urlAPI + 'forum_chat');
  }

  public deletePost(forumId: string, postId: string) {
    return this.http.delete(`${this.url}${forumId}/delete/${postId}`);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

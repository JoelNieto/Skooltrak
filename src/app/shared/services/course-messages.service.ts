import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CourseMessage } from '../models/studyplans.model';

@Injectable({ providedIn: 'root' })
export class CourseMessageService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'coursesmessages/';
  }

  public getAll() {
    return this.http.get<CourseMessage[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<CourseMessage>(`${this.url}${id}`);
  }

  public create(message: CourseMessage) {
    return this.http.post<CourseMessage>(this.url, message);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

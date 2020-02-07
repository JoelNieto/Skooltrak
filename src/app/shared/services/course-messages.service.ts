import { Injectable } from '@angular/core';

import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';
import { CourseMessage } from '../models/studyplans.model';

@Injectable({ providedIn: 'root' })
export class CourseMessageService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'coursesmessages';
  }

  public getAll() {
    return this.http.get<CourseMessage[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<CourseMessage>(this.url, id);
  }

  public create(message: CourseMessage) {
    return this.http.post<CourseMessage>(this.url, message);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

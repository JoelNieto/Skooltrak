import { Injectable } from '@angular/core';

import { UploadFile } from '../models/documents.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';
import { Content } from '../models/content.model';

@Injectable({ providedIn: 'root' })
export class PersonalService {
  private url: string;
  constructor(
    private http: CustomHttpService,
    private conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'Personal';
  }

  public getDocuments() {
    return this.http.get<UploadFile[]>(this.url, 'Documents');
  }

  public getContent() {
    return this.http.get<Content[]>(this.url, 'Contents');
  }
}

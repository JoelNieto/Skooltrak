import { Injectable } from '@angular/core';

import { UploadFile } from '../models/documents.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private url: string;
  constructor(
    private http: CustomHttpService,
    private conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'documents';
  }

  public getAll() {
    return this.http.get<UploadFile[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<UploadFile>(this.url, id);
  }

  public create(document: UploadFile) {
    return this.http.post<UploadFile>(this.url, document);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}

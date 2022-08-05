import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { UploadFile } from '../models/documents.model';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'documents/';
  }

  public getAll() {
    return this.http.get<UploadFile[]>(this.url, { context: withCache() });
  }

  public get(id: string) {
    return this.http.get<UploadFile>(`${this.url}${id}`, {
      context: withCache({ ttl: 36000000 }),
    });
  }

  public create(document: UploadFile) {
    return this.http.post<UploadFile>(this.url, document);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}

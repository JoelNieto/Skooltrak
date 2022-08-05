import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Content } from '../models/content.model';
import { UploadFile } from '../models/documents.model';

@Injectable({ providedIn: 'root' })
export class PersonalService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'Personal/';
  }

  public getDocuments() {
    return this.http.get<UploadFile[]>(this.url + 'Documents');
  }

  public getContent() {
    return this.http.get<Content[]>(this.url + 'Contents');
  }
}

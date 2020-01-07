import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SessionsService } from './sessions.service';

@Injectable({ providedIn: 'root' })
export class CustomHttpService {
  constructor(
    private readonly http: HttpClient,
    private readonly session: SessionsService
  ) {}

  createHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      userId: this.session.currentUser ? this.session.currentUser.id : ''
    });
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  get<T>(url: string, id?: string) {
    if (id) {
      return this.http.get<T>(`${url}/${id}`, { headers: this.createHeader() });
    } else {
      return this.http.get<T>(url, { headers: this.createHeader() });
    }
  }

  post<T>(url: string, element: T) {
    return this.http.post<T>(url, element, { headers: this.createHeader() });
  }

  edit(url: string, id: string, element: any) {
    return this.http.put(`${url}/${id}`, element, {
      headers: this.createHeader()
    });
  }

  delete(url: string, id: string) {
    return this.http.delete(`${url}/${id}`, { headers: this.createHeader() });
  }
}
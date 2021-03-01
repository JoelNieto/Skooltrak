import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';

import { SessionService } from './session.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class CustomHttpService {
  constructor(
    private readonly http: HttpClient,
    private readonly session: SessionService,
    private readonly storage: StorageService
  ) {}

  createHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      userId: this.session.currentUser ? this.session.currentUser.id : '',
    });
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  get<T>(url: string, id?: string, queryParams?: HttpParams) {
    if (id) {
      return this.http
        .get<T>(`${url}/${id}`, {
          params: queryParams,
          headers: this.createHeader(),
        })
        .pipe(timeout(20000));
    } else {
      return this.http
        .get<T>(url, { headers: this.createHeader(), params: queryParams })
        .pipe(timeout(20000));
    }
  }

  post<T>(url: string, element: any) {
    return this.http
      .post<T>(url, element, {
        headers: this.createHeader(),
      })
      .pipe(timeout(20000));
  }

  edit(url: string, id: string, element: any) {
    return this.http
      .put(`${url}/${id}`, element, {
        headers: this.createHeader(),
      })
      .pipe(timeout(20000));
  }

  delete(url: string, id: string) {
    console.log('url:', url);
    return this.http
      .delete(`${url}/${id}`, { headers: this.createHeader() })
      .pipe(timeout(2000));
  }

  uploadFiles(files: File[], url: string) {
    if (files.length > 0) {
      const formData: FormData = new FormData();
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
      }
      return this.http.post<any>(url, formData);
    }
  }

  uploadImage(url: string, file: any) {
    const files = file.target.files as File[];
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }

    return this.http.post(url, FormData, {
      headers: new HttpHeaders({
        userId: this.session.currentUser ? this.session.currentUser.id : '',
      }),
    });
  }
}

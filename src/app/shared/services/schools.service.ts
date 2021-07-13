import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { School } from '../models/schools.model';

@Injectable({ providedIn: 'root' })
export class SchoolsService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'schools/';
  }

  getAll() {
    return this.http.get<School[]>(this.url);
  }

  get(id: string) {
    return this.http.get<School>(`${this.url}${id}`, { context: withCache() });
  }

  getDefault() {
    return this.http.get<School>(this.url + 'default', {
      context: withCache(),
    });
  }

  create(school: School) {
    return this.http.post<School>(this.url, school);
  }

  edit(id: string, school: School) {
    return this.http.put(`${this.url}${id}`, school);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }

  getLogo(school: School): string {
    if (school?.logoURL) {
      if (this.isValidURL(school.logoURL)) {
        return school.logoURL;
      } else {
        return this.getFile(school.logoURL);
      }
    } else {
      return 'assets/img/skooltrak-logo.svg';
    }
  }

  getFile(id: string) {
    return environment.urlAPI + 'files/' + id;
  }

  isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
}

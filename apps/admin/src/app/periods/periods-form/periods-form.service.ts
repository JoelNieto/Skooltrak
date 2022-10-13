import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { School } from '@skooltrak-app/models';

@Injectable()
export class PeriodsFormService {
  constructor(private http: HttpClient) {}

  getSchools = () => this.http.get<School[]>('/api/schools');
}

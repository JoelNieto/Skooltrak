import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { School } from '@skooltrak-app/models';

@Injectable()
export class DegreesFormService {
  constructor(private http: HttpClient) {}

  public getSchools = () => this.http.get<School[]>('/api/schools');
}

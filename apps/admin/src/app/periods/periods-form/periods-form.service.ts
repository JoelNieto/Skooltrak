import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { School } from '@skooltrak-app/models';

@Injectable()
export class PeriodsFormService {
  private http = inject(HttpClient);

  getSchools = () => this.http.get<School[]>('/api/schools');
}

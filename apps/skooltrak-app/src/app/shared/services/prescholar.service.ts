import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { EvaluationValue } from '../models/prescholar.model';

@Injectable({ providedIn: 'root' })
export class PreScholarService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'PreScholar/';
  }

  public setValue(item: {
    studentId: string;
    areaId: string;
    itemName: string;
    periodId: string;
    value: string;
  }) {
    return this.http.post(this.url + 'SetEvaluation', item);
  }

  public getValues(id: string) {
    return this.http.get<EvaluationValue[]>(this.url + id, {
      context: withCache(),
    });
  }
}

import { Injectable } from '@angular/core';

import { EvaluationValue } from '../models/prescholar.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class PreScholarService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'PreScholar/';
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
    return this.http.get<EvaluationValue[]>(this.url + id);
  }
}

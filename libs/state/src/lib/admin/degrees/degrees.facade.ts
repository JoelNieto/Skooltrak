import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Degree, School } from '@skooltrak-app/models';
import { shareReplay } from 'rxjs';

import { DegreesActions } from './degrees.actions';
import * as DegreesSelectors from './degrees.selectors';

@Injectable()
export class DegreesFacade {
  allDegrees$ = this.store.select(DegreesSelectors.selectAllDegrees);
  schools$ = this.http.get<School[]>('/api/schools').pipe(shareReplay());
  constructor(private readonly store: Store, private http: HttpClient) {}

  init() {
    this.store.dispatch(DegreesActions.initDegrees());
  }

  create(request: Degree) {
    this.store.dispatch(DegreesActions.createDegree({ request }));
  }

  edit(id: string, request: Partial<Degree>) {
    this.store.dispatch(DegreesActions.editDegree({ id, request }));
  }

  delete(id: string) {
    this.store.dispatch(DegreesActions.deleteDegree({ id }));
  }
}

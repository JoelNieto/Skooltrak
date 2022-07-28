import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { School, Subject } from '@skooltrak-app/models';
import { shareReplay } from 'rxjs';

import { SubjectsActions } from './subjects.actions';
import * as SubjectsSelectors from './subjects.selectors';

@Injectable()
export class SubjectsFacade {
  allSubjects$ = this.store.select(SubjectsSelectors.selectAllSubjects);
  schools$ = this.http.get<School[]>('/api/schools').pipe(shareReplay());
  constructor(private readonly store: Store, private http: HttpClient) {}

  init() {
    this.store.dispatch(SubjectsActions.initSubjects());
  }

  create(request: Subject) {
    this.store.dispatch(SubjectsActions.createSubject({ request }));
  }

  edit(id: string, request: Partial<Subject>) {
    this.store.dispatch(SubjectsActions.editSubject({ id, request }));
  }

  delete(id: string) {
    this.store.dispatch(SubjectsActions.deleteSubject({ id }));
  }
}

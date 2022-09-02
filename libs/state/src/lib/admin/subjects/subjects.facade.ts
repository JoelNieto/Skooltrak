import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from '@skooltrak-app/models';

import { selectAllSchools } from '../schools';
import { SubjectsActions } from './subjects.actions';
import * as SubjectsSelectors from './subjects.selectors';

@Injectable()
export class SubjectsFacade {
  allSubjects$ = this.store$.select(SubjectsSelectors.selectAllSubjects);
  schools$ = this.store$.select(selectAllSchools);
  constructor(private readonly store$: Store) {}

  init() {
    this.store$.dispatch(SubjectsActions.initSubjects());
  }

  create(request: Subject) {
    this.store$.dispatch(SubjectsActions.createSubject({ request }));
  }

  edit(id: string, request: Partial<Subject>) {
    this.store$.dispatch(SubjectsActions.editSubject({ id, request }));
  }

  delete(id: string) {
    this.store$.dispatch(SubjectsActions.deleteSubject({ id }));
  }
}

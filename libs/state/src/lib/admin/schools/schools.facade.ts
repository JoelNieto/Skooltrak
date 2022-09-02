import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { School } from '@skooltrak-app/models';

import { selectSelectedId } from '../students';
import { SchoolsActions } from './schools.actions';
import { selectAllSchools, selectSelected } from './schools.selectors';

@Injectable()
export class SchoolsFacade {
  allSchools$ = this.store$.select(selectAllSchools);
  selectedSchool$ = this.store$.select(selectSelected);
  selectedSchoolId$ = this.store$.select(selectSelectedId);

  constructor(private store$: Store) {}

  init() {
    this.store$.dispatch(SchoolsActions.loadSchools());
  }

  create(request: School) {
    this.store$.dispatch(SchoolsActions.createSchool({ request }));
  }

  set(id: string | null) {
    this.store$.dispatch(SchoolsActions.setSchool({ id }));
  }

  edit(id: string, request: School) {
    this.store$.dispatch(SchoolsActions.updateSchool({ id, request }));
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AssignmentType } from '@skooltrak-app/models';

import { AssignmentTypesActions } from './assignment-types.actions';
import * as AssignmentTypesSelectors from './assignment-types.selectors';

@Injectable()
export class AssignmentTypesFacade {
  allAssignmentTypes$ = this.store$.select(
    AssignmentTypesSelectors.selectAllAssignmentTypes
  );
  constructor(private readonly store$: Store) {}

  init() {
    this.store$.dispatch(AssignmentTypesActions.initAssignmentTypes());
  }

  create(request: Partial<AssignmentType>) {
    this.store$.dispatch(
      AssignmentTypesActions.createAssignmentType({ request })
    );
  }

  edit(id: string, request: Partial<AssignmentType>) {
    this.store$.dispatch(
      AssignmentTypesActions.editAssignmentType({ id, request })
    );
  }

  delete(id: string) {
    this.store$.dispatch(AssignmentTypesActions.deleteAssignmentType({ id }));
  }
}

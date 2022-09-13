import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClassGroup } from '@skooltrak-app/models';

import { ClassGroupsActions } from './class-groups.actions';
import * as ClassGroupsSelectors from './class-groups.selectors';

@Injectable()
export class ClassGroupsFacade {
  allClassGroups$ = this.store$.select(
    ClassGroupsSelectors.selectAllClassGroups
  );
  selectedClassGroup$ = this.store$.select(ClassGroupsSelectors.selectSelected);

  constructor(private readonly store$: Store) {}

  init() {
    this.store$.dispatch(ClassGroupsActions.initClassGroups());
  }

  create(request: ClassGroup) {
    this.store$.dispatch(ClassGroupsActions.createClassGroup({ request }));
  }

  edit(id: string, request: Partial<ClassGroup>) {
    this.store$.dispatch(ClassGroupsActions.editClassGroup({ id, request }));
  }

  delete(id: string) {
    this.store$.dispatch(ClassGroupsActions.deleteClassGroup({ id }));
  }

  setClassGroup(id: string | undefined) {
    this.store$.dispatch(ClassGroupsActions.setClassGroup({ id }));
  }
}

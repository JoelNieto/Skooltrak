import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GroupsActions } from './groups.actions';
import * as GroupsSelectors from './groups.selectors';

@Injectable()
export class GroupsFacade {
  allGroups$ = this.store$.select(GroupsSelectors.selectAllGroups);
  selectedGroup$ = this.store$.select(GroupsSelectors.selectSelected);
  selectedGroupId$ = this.store$.select(GroupsSelectors.selectSelectedId);
  constructor(private store$: Store) {}

  init() {
    this.store$.dispatch(GroupsActions.initGroups());
  }

  setGroup(id: string | undefined) {
    this.store$.dispatch(GroupsActions.setGroup({ id }));
  }
}

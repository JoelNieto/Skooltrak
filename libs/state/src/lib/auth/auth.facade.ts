import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthActions } from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  logging$ = this.store$.select(AuthSelectors.selectLogging);
  logged$ = this.store$.select(AuthSelectors.selectLogged);
  user$ = this.store$.select(AuthSelectors.selectUser);
  links$ = this.store$.select(AuthSelectors.selectLinks);
  avatar$ = this.store$.select(AuthSelectors.selectAvatar);
  role$ = this.store$.select(AuthSelectors.selectRole);

  constructor(private readonly store$: Store) {}

  init() {
    this.store$.dispatch(AuthActions.initState());
  }

  signIn(username: string, password: string) {
    this.store$.dispatch(AuthActions.signIn({ username, password }));
  }

  loadUserInfo() {
    this.store$.dispatch(AuthActions.loadUserInfo());
  }

  signOut() {
    this.store$.dispatch(AuthActions.signOut());
  }

  changeAvatar(file: File) {
    this.store$.dispatch(AuthActions.changeAvatar({ file }));
  }
}

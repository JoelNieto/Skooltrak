import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthActions } from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  logging$ = this.store.select(AuthSelectors.selectLogging);
  logged$ = this.store.select(AuthSelectors.selectLogged);
  user$ = this.store.select(AuthSelectors.selectUser);
  links$ = this.store.select(AuthSelectors.selectLinks);
  avatar$ = this.store.select(AuthSelectors.selectAvatar);
  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(AuthActions.initState());
  }

  signIn(username: string, password: string) {
    this.store.dispatch(AuthActions.signIn({ username, password }));
  }

  loadProfile() {
    this.store.dispatch(AuthActions.loadProfile());
  }

  signOut() {
    this.store.dispatch(AuthActions.signOut());
  }
}

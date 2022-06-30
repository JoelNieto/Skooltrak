import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectLogging = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.logging
);
export const selectLogged = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.logging
);

export const selectToken = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.token
);

export const selectUser = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.user
);

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
  (state: fromAuth.State) => state.logged
);

export const selectRole = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.role
);

export const selectLinks = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.links
);

export const selectUser = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.user
);

export const selectAvatar = createSelector(
  selectUser,
  (state) => state?.profileURL
);

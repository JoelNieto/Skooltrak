import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Role, User } from '@skooltrak-app/models';

import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  token: undefined | string;
  role: undefined | Role;
  user: undefined | Partial<User>;
  logged: boolean;
  logging: boolean;
  loggingError: HttpErrorResponse | undefined;
}

export const initialState: State = {
  token: undefined,
  role: undefined,
  user: undefined,
  logged: false,
  logging: false,
  loggingError: undefined,
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.initState, (state): State => state),
  on(
    AuthActions.signIn,
    (state): State => ({
      ...state,
      logging: true,
      logged: false,
    })
  ),
  on(
    AuthActions.signInSuccess,
    (state, { token, role }): State => ({
      ...state,
      logging: false,
      logged: true,
      token,
      role,
    })
  ),
  on(
    AuthActions.signInFailure,
    (state, { error }): State => ({
      ...state,
      logging: false,
      loggingError: error,
    })
  ),
  on(AuthActions.loadProfileSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.signOut, (state) => initialState)
);

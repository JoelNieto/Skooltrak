import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Role, Student, Teacher, User } from '@skooltrak-app/models';

import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  role: undefined | Role;
  links: undefined | { route?: string; icon?: string; title: string }[];
  profile: undefined | Teacher | Student | Student[];
  user: undefined | Partial<User>;
  logged: boolean;
  logging: boolean;
  loggingError: HttpErrorResponse | undefined;
}

export const initialState: State = {
  role: undefined,
  user: undefined,
  profile: undefined,
  links: undefined,
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
    (state, { role }): State => ({
      ...state,
      logging: false,
      logged: true,
      role,
    })
  ),
  on(AuthActions.setLinks, (state, { links }) => ({ ...state, links })),
  on(
    AuthActions.signInFailure,
    (state, { error }): State => ({
      ...state,
      logging: false,
      loggingError: error,
    })
  ),
  on(AuthActions.changeAvatarSuccess, (state, { profileURL }) => ({
    ...state,
    user: { ...state.user, profileURL },
  })),
  on(AuthActions.loadUserInfoSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.signOut, (state) => initialState)
);

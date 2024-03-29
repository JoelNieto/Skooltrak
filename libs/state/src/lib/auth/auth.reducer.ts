import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Link, RoleEnum, Student, Teacher, User } from '@skooltrak-app/models';

import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  role: undefined | RoleEnum;
  links: undefined | Partial<Link>[];
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
  logged: true,
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
  on(AuthActions.setLinks, (state, { links }): State => ({ ...state, links })),
  on(
    AuthActions.signInFailure,
    (state, { error }): State => ({
      ...state,
      logging: false,
      loggingError: error,
    })
  ),
  on(
    AuthActions.changeAvatarSuccess,
    (state, { profileURL }): State => ({
      ...state,
      user: { ...state.user, profileURL },
    })
  ),
  on(
    AuthActions.loadUserInfoSuccess,
    (state, { user }): State => ({
      ...state,
      user,
      logged: true,
      role: user.role,
    })
  ),
  on(
    AuthActions.loadProfile,
    (state, { profile }): State => ({ ...state, profile })
  ),
  on(
    AuthActions.loadUserInfoFailure,
    (state): State => ({ ...state, logged: false })
  ),
  on(AuthActions.signOut, (): State => ({ ...initialState, logged: false }))
);

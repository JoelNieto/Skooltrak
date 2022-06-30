import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Role } from '@skooltrak-app/models';

export const AuthActions = createActionGroup({
  source: 'AUTH',
  events: {
    'Init State': emptyProps(),
    'Sign In': props<{ username: string; password: string }>(),
    'Sign In Success': props<{ token: string; role: Role }>(),
    'Sign In Failure': props<{ error: HttpErrorResponse }>(),
  },
});

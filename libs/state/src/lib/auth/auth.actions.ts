import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Link, RoleEnum, Student, Teacher, User } from '@skooltrak-app/models';

export const AuthActions = createActionGroup({
  source: 'AUTH',
  events: {
    'Init State': emptyProps(),
    'Sign In': props<{ username: string; password: string }>(),
    'Sign In Success': props<{ token: string; role: RoleEnum }>(),
    'Sign In Failure': props<{ error: HttpErrorResponse }>(),
    'Set Links': props<{ links: Partial<Link>[] }>(),
    'Load Profile ': props<{ profile: Teacher | Student | Student[] }>(),
    'Change Avatar': props<{ file: File }>(),
    'Change Avatar Success': props<{ profileURL: string }>(),
    'Load User Info': emptyProps(),
    'Load User Info Success': props<{ user: Partial<User> }>(),
    'Load User Info Failure': emptyProps(),
    'Sign Out': emptyProps(),
  },
});

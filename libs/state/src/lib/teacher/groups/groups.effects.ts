import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { GroupsActions } from './groups.actions';
import { GroupsService } from './groups.service';

@Injectable()
export class GroupsEffects {
  loadGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsActions.initGroups),
      switchMap(() =>
        this.service.getAll().pipe(
          map((payload) => GroupsActions.loadGroupsSuccess({ payload })),
          catchError((error) => of(GroupsActions.loadGroupsFailure({ error })))
        )
      )
    );
  });
  constructor(private actions$: Actions, private service: GroupsService) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, combineLatestWith, map, switchMap } from 'rxjs/operators';
import { MessagingService } from '../messaging.service';
import { MessagesActions } from './messages.actions';
import { MessagesFacade } from './messages.facade';

@Injectable()
export class MessagesEffects {
  loadMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagesActions.loadInbox),
      combineLatestWith(this.facade.pageSize$, this.facade.pageIndex$),
      switchMap(([, size, page]) =>
        this.service.getInbox(size, page).pipe(
          map((payload) => MessagesActions.loadInboxSuccess({ payload })),
          catchError((error) => of(MessagesActions.loadInboxFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private service: MessagingService,
    private facade: MessagesFacade
  ) {}
}

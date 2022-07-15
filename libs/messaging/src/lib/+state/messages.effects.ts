import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as MessagesActions from './messages.actions';


@Injectable()
export class MessagesEffects {

  loadMessagess$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(MessagesActions.loadMessagess),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => MessagesActions.loadMessagessSuccess({ data })),
          catchError(error => of(MessagesActions.loadMessagessFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}

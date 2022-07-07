import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as MessagingActions from './messaging.actions';

@Injectable()
export class MessagingEffects {


  loadMessagings$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(MessagingActions.loadMessagings),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}

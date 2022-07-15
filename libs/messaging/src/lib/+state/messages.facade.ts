import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessagesActions } from './messages.actions';
import { selectAllMessages, selectCount } from './messages.selectors';

@Injectable({ providedIn: 'root' })
export class MessagesFacade {
  messages$ = this.store.select(selectAllMessages);
  count$ = this.store.select(selectCount);
  constructor(private store: Store) {}

  init() {
    this.store.dispatch(MessagesActions.loadInbox());
  }
}

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MessagingEffects } from './messaging.effects';

describe('MessagingEffects', () => {
  let actions$: Observable<any>;
  let effects: MessagingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessagingEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MessagingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

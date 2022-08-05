import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DegreesEffects } from './degrees.effects';

describe('DegreesEffects', () => {
  let actions$: Observable<any>;
  let effects: DegreesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DegreesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DegreesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TeachersEffects } from './teachers.effects';

describe('TeachersEffects', () => {
  let actions$: Observable<any>;
  let effects: TeachersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeachersEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(TeachersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

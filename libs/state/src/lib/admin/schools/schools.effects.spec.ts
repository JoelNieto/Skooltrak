import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SchoolsEffects } from './schools.effects';

describe('SchoolsEffects', () => {
  let actions$: Observable<any>;
  let effects: SchoolsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SchoolsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SchoolsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

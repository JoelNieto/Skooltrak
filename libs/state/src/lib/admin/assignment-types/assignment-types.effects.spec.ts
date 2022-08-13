import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AssignmentTypesEffects } from './assignment-types.effects';

describe('AssignmentTypesEffects', () => {
  let actions$: Observable<any>;
  let effects: AssignmentTypesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignmentTypesEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(AssignmentTypesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

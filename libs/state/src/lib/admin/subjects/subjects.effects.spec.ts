import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SubjectsEffects } from './subjects.effects';

describe('SubjectsEffects', () => {
  let actions$: Observable<any>;
  let effects: SubjectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SubjectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

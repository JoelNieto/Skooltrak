import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StudyPlansEffects } from './study-plans.effects';

describe('StudyPlansEffects', () => {
  let actions$: Observable<any>;
  let effects: StudyPlansEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StudyPlansEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StudyPlansEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

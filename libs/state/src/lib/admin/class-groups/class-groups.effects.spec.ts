import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ClassGroupsEffects } from './class-groups.effects';

describe('ClassGroupsEffects', () => {
  let actions$: Observable<any>;
  let effects: ClassGroupsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassGroupsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ClassGroupsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

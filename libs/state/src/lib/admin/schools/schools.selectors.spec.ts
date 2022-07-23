import * as fromSchools from './schools.reducer';
import { selectSchoolsState } from './schools.selectors';

describe('Schools Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSchoolsState({
      [fromSchools.schoolsFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});

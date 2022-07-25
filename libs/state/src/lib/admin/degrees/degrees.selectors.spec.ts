import * as fromDegrees from './degrees.reducer';
import { selectDegreesState } from './degrees.selectors';

describe('Degrees Selectors', () => {
  it('should select the feature state', () => {
    const result = selectDegreesState({
      [fromDegrees.degreesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});

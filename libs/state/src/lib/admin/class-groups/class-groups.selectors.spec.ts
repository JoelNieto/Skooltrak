import * as fromClassGroups from './class-groups.reducer';
import { selectClassGroupsState } from './class-groups.selectors';

describe('ClassGroups Selectors', () => {
  it('should select the feature state', () => {
    const result = selectClassGroupsState({
      [fromClassGroups.classGroupsFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});

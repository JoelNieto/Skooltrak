import * as fromAssignmentTypes from './assignment-types.reducer';
import { selectAssignmentTypesState } from './assignment-types.selectors';

describe('AssignmentTypes Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAssignmentTypesState({
      [fromAssignmentTypes.assignmentTypesFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});

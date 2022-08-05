import * as fromTeachers from './teachers.reducer';
import { selectTeachersState } from './teachers.selectors';

describe('Teachers Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTeachersState({
      [fromTeachers.teachersFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});

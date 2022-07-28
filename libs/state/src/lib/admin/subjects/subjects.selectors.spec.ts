import * as fromSubjects from './subjects.reducer';
import { selectSubjectsState } from './subjects.selectors';

describe('Subjects Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSubjectsState({
      [fromSubjects.subjectsFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});

import * as fromStudyPlans from './study-plans.reducer';
import { selectStudyPlansState } from './study-plans.selectors';

describe('StudyPlans Selectors', () => {
  it('should select the feature state', () => {
    const result = selectStudyPlansState({
      [fromStudyPlans.studyPlansFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});

import * as fromMessages from './messages.reducer';
import { selectMessagesState } from './messages.selectors';

describe('Messages Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMessagesState({
      [fromMessages.messagesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});

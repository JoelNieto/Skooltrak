import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMessaging from './messaging.reducer';

export const selectMessagingState = createFeatureSelector<fromMessaging.State>(
  fromMessaging.messagingFeatureKey
);

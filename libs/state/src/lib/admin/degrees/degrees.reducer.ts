import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Degree } from '@skooltrak-app/models';

import { DegreesActions } from './degrees.actions';

export const degreesFeatureKey = 'degrees';

export interface State extends EntityState<Degree> {
  selectedId?: string | null;
  loaded: boolean;
  error?: unknown;
}

const selectId = (x: Degree) => x._id;

export const degreesAdapter: EntityAdapter<Degree> =
  createEntityAdapter<Degree>({ selectId });

export const initialState: State = degreesAdapter.getInitialState({
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  on(DegreesActions.loadDegreesSuccess, (state, { payload }) =>
    degreesAdapter.setAll(payload, { ...state, loaded: true })
  ),
  on(DegreesActions.createDegreeSuccess, (state, { payload }) =>
    degreesAdapter.addOne(payload, state)
  ),
  on(DegreesActions.editDegreeSuccess, (state, { id, changes }) =>
    degreesAdapter.updateOne({ id, changes }, state)
  ),
  on(DegreesActions.deleteDegreeSuccess, (state, { id }) =>
    degreesAdapter.removeOne(id, state)
  )
);

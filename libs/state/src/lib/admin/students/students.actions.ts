import { createAction, props } from '@ngrx/store';

export const loadStudentss = createAction('[Students] Load Studentss');

export const loadStudentssSuccess = createAction(
  '[Students] Load Studentss Success',
  props<{ data: any }>()
);

export const loadStudentssFailure = createAction(
  '[Students] Load Studentss Failure',
  props<{ error: any }>()
);

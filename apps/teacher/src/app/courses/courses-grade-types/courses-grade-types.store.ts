/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { GradeType } from '@skooltrak-app/models';
import { teacher_courses } from '@skooltrak-app/state';
import { filter, map, switchMap } from 'rxjs';
import { CourseGradeTypesService } from './courses-grade-types.service';

export interface State {
  types: GradeType[];
}
@Injectable()
export class CourseGradeTypesStore
  extends ComponentStore<State>
  implements OnStoreInit
{
  constructor(
    private store: teacher_courses.CoursesFacade,
    private service: CourseGradeTypesService
  ) {
    super({
      types: [],
    });
  }

  // SELECTORS

  readonly types$ = this.select((state) => state.types);

  // EFFECTS
  readonly fetchTypes = this.effect(() => {
    return this.store.selectedCourseId$.pipe(
      filter((id) => !!id),
      switchMap((id) =>
        this.service.getTypes(id!).pipe(map((types) => this.setTypes(types)))
      )
    );
  });

  // UPDATERS

  private readonly setTypes = this.updater(
    (state, types: GradeType[]): State => ({ ...state, types })
  );

  ngrxOnStoreInit() {
    this.fetchTypes();
  }
}

import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Course, GradeType } from '@skooltrak-app/models';
import { catchError, filter, of, switchMap, tap } from 'rxjs';
import { GradesFormService } from './grades-form.service';

interface State {
  types: GradeType[];
  course: Course | null;
}

@Injectable()
export class GradesFormStore extends ComponentStore<State> {
  constructor() {
    super({ types: [], course: null });
  }
  private readonly service = inject(GradesFormService);

  //SELECTORS
  readonly types$ = this.select((state) => state.types);
  readonly course$ = this.select((state) => state.course);

  //UPDATERS
  readonly setTypes = this.updater(
    (state, types: GradeType[]): State => ({ ...state, types })
  );

  //EFFECTS
  readonly fetchTypes = this.effect(() => {
    return this.course$.pipe(
      filter((course) => !!course),
      switchMap((course) =>
        this.service.getTypes(course?._id).pipe(
          catchError((err) => {
            console.error(err);
            return of([]);
          }),
          tap((types) => this.setTypes(types))
        )
      )
    );
  });
}

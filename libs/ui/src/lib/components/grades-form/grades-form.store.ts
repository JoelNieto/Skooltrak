import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Course, GradeType } from '@skooltrak-app/models';
import { catchError, of, switchMap, tap } from 'rxjs';
import { GradesFormService } from './grades-form.service';

interface State {
  types: GradeType[];
  course: Course;
}

@Injectable()
export class GradesFormStore extends ComponentStore<State> {
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
      switchMap(({ _id }) =>
        this.service.getTypes(_id).pipe(
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

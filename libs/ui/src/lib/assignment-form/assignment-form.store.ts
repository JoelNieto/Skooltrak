/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import {
  Assignment,
  AssignmentType,
  ClassGroup,
  Course,
} from '@skooltrak-app/models';
import {
  combineLatestWith,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

import { AssignmentFormService } from './assignment-form.service';

export interface FormState {
  current?: Assignment;
  courses: Course[];
  types: AssignmentType[];
  currentCourse?: Course;
  groups: ClassGroup[];
  currentGroup?: ClassGroup;
  start?: Date;
  end?: Date;
  close: boolean;
}

@Injectable()
export class AssignmentFormStore extends ComponentStore<FormState> {
  constructor(
    private service: AssignmentFormService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    super({ courses: [], groups: [], close: false, types: [] });
  }

  // SELECTORS
  readonly current$ = this.select((state) => state.current);
  readonly course$ = this.select((state) => state.currentCourse);
  readonly groups$ = this.select((state) => state.groups);
  readonly start$ = this.select((state) => state.start);
  readonly end$ = this.select((state) => state.end);
  readonly close$ = this.select((state) => state.close);
  readonly disabledCourse$ = this.current$.pipe(
    combineLatestWith(this.course$),
    map(([current, course]) => !!course || !!current)
  );

  readonly types$ = this.select((state) => state.types);

  readonly disableGroup$ = this.current$.pipe(map((current) => !!current));

  // EFFECTS

  readonly fetchGroups = this.effect(() => {
    return this.course$.pipe(
      combineLatestWith(this.current$),
      filter(([course, current]) => !!course || !!current),
      switchMap(([course, current]) =>
        this.service
          .getGroups(course?.plan._id ?? current?.plan!._id!)
          .pipe(map((groups) => this.setGroups(groups)))
      )
    );
  });

  readonly fetchTypes = this.effect(() => {
    return this.service.getTypes().pipe(map((types) => this.setTypes(types)));
  });

  readonly createAssignment = this.effect(
    (payload$: Observable<Partial<Assignment>>) => {
      return payload$.pipe(
        switchMap((assignment) =>
          this.service.postAssignment(assignment).pipe(
            tap(() =>
              this.snackBar.open(
                this.translate.instant('Item created successfully'),
                undefined,
                { panelClass: ['alert', 'success'] }
              )
            ),
            tap(() => this.close())
          )
        )
      );
    }
  );

  // UPDATERS
  public readonly setCourse = this.updater(
    (state, course?: Course): FormState => ({ ...state, currentCourse: course })
  );

  public readonly setCurrent = this.updater(
    (state, current: Assignment): FormState => ({ ...state, current })
  );

  private readonly setTypes = this.updater(
    (state, types: AssignmentType[]): FormState => ({ ...state, types })
  );

  public readonly setStart = this.updater(
    (state, value: { date: Date; time: string }): FormState => ({
      ...state,
      start: new Date(value.date.toDateString() + ' ' + value.time),
    })
  );

  public readonly setEnd = this.updater(
    (state, value: { date: Date; time: string }): FormState => ({
      ...state,
      end: new Date(value.date.toDateString() + ' ' + value.time),
    })
  );

  private readonly setGroups = this.updater(
    (state, groups: ClassGroup[]): FormState => ({ ...state, groups })
  );

  private readonly close = this.updater(
    (state): FormState => ({ ...state, close: true })
  );
}

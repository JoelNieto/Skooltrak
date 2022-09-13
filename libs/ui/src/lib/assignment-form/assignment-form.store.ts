/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ClassGroup, Course } from '@skooltrak-app/models';
import { filter, map, switchMap } from 'rxjs';

import { AssignmentFormService } from './assignment-form.service';

export interface FormState {
  courses: Course[];
  currentCourse?: Course;
  groups: ClassGroup[];
  currentGroup?: ClassGroup;
  start?: Date;
  end?: Date;
}

@Injectable()
export class AssignmentFormStore extends ComponentStore<FormState> {
  constructor(private service: AssignmentFormService) {
    super({ courses: [], groups: [] });
  }

  // SELECTORS

  readonly course$ = this.select((state) => state.currentCourse);
  readonly groups$ = this.select((state) => state.groups);
  readonly start$ = this.select((state) => state.start);
  readonly end$ = this.select((state) => state.end);

  // EFFECTS

  readonly fetchGroups = this.effect(() => {
    return this.course$.pipe(
      filter((course) => !!course),
      switchMap((course) =>
        this.service
          .getGroups(course?.plan._id!)
          .pipe(map((groups) => this.setGroups(groups)))
      )
    );
  });

  // UPDATERS
  public readonly setCourse = this.updater(
    (state, course?: Course): FormState => ({ ...state, currentCourse: course })
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
}

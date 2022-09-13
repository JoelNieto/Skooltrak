import { CoursesFormService } from './courses-form.service';

import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { StudyPlan, Subject, Teacher } from '@skooltrak-app/models';
import { map } from 'rxjs';

export interface FormState {
  plans: StudyPlan[];
  teachers: Teacher[];
  subjects: Subject[];
}

@Injectable()
export class CoursesFormStore
  extends ComponentStore<FormState>
  implements OnStoreInit
{
  constructor(private readonly service: CoursesFormService) {
    super({ plans: [], teachers: [], subjects: [] });
  }

  // SELECTORS

  public readonly plans$ = this.select((state) => state.plans);

  public readonly teachers$ = this.select((state) => state.teachers);

  public readonly subjects$ = this.select((state) => state.subjects);

  // UPDATERS
  private readonly setPlans = this.updater(
    (state, plans: StudyPlan[]): FormState => ({ ...state, plans })
  );

  private readonly setTeachers = this.updater(
    (state, teachers: Teacher[]): FormState => ({ ...state, teachers })
  );
  private readonly setSubjects = this.updater(
    (state, subjects: Subject[]): FormState => ({ ...state, subjects })
  );

  // EFFECTS
  private readonly fetchPlans = this.effect(() => {
    return this.service.getPlans().pipe(map((plans) => this.setPlans(plans)));
  });

  private readonly fetchTeachers = this.effect(() => {
    return this.service
      .getTeachers()
      .pipe(map((teachers) => this.setTeachers(teachers)));
  });

  private readonly fetchSubjects = this.effect(() => {
    return this.service
      .getSubjects()
      .pipe(map((subjects) => this.setSubjects(subjects)));
  });

  ngrxOnStoreInit() {
    this.fetchPlans();
    this.fetchTeachers();
    this.fetchSubjects();
  }
}

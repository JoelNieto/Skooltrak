import { inject, Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { StudyPlan, Teacher } from '@skooltrak-app/models';
import { map } from 'rxjs';
import { ClassGroupsFormService } from './class-groups-form.service';

export interface FormState {
  plans: StudyPlan[];
  teachers: Teacher[];
}

@Injectable()
export class ClassGroupFormStore
  extends ComponentStore<FormState>
  implements OnStoreInit
{
  private service = inject(ClassGroupsFormService);

  // SELECTORS

  public readonly plans$ = this.select((state) => state.plans);

  public readonly teachers$ = this.select((state) => state.teachers);

  // UPDATERS
  private readonly setPlans = this.updater(
    (state, plans: StudyPlan[]): FormState => ({ ...state, plans })
  );

  private readonly setTeachers = this.updater(
    (state, teachers: Teacher[]): FormState => ({ ...state, teachers })
  );

  // EFFECTS
  readonly fetchPlans = this.effect(() => {
    return this.service.getPlans().pipe(map((plans) => this.setPlans(plans)));
  });

  readonly fetchTeachers = this.effect(() => {
    return this.service
      .getTeachers()
      .pipe(map((teachers) => this.setTeachers(teachers)));
  });

  ngrxOnStoreInit() {
    this.setState({ plans: [], teachers: [] });
  }
}

import { inject, Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import {
  ClassGroup,
  Degree,
  School,
  Student,
  StudyPlan,
} from '@skooltrak-app/models';

import { catchError, filter, of, switchMap, tap } from 'rxjs';
import { StudentsFormService } from './students-form.service';

interface FormState {
  current?: Partial<Student>;
  groups: ClassGroup[];
  plans: StudyPlan[];
  degrees: Degree[];
  schools: School[];
  selectedSchool?: School;
  selectedPlan?: StudyPlan;
  selectedDegree?: Degree;
  selectedGroup?: ClassGroup;
}

@Injectable()
export class StudentsFormStore
  extends ComponentStore<FormState>
  implements OnStoreInit
{
  private service = inject(StudentsFormService);

  // SELECTORS

  readonly schools$ = this.select((state) => state.schools);
  private readonly school$ = this.select((state) => state.selectedSchool);
  readonly degrees$ = this.select((state) => state.degrees);
  private readonly degree$ = this.select((state) => state.selectedDegree);
  readonly plans$ = this.select((state) => state.plans);
  private readonly plan$ = this.select((state) => state.selectedPlan);
  readonly groups$ = this.select((state) => state.groups);

  // EFFECTS

  readonly fetchSchools = this.effect(() => {
    return this.service.getAllSchools().pipe(
      tap((schools) => this.setSchools(schools)),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  });

  readonly fetchDegrees = this.effect(() => {
    return this.school$.pipe(
      filter((school) => !!school),
      switchMap(({ _id }) =>
        this.service.getDegrees(_id).pipe(
          tap((degrees) => this.setDegrees(degrees)),
          catchError((error) => {
            console.error(error);
            return of([]);
          })
        )
      )
    );
  });

  readonly fetchPlans = this.effect(() => {
    return this.degree$.pipe(
      filter((degree) => !!degree),
      switchMap(({ _id }) =>
        this.service.getPlans(_id).pipe(
          tap((plans) => this.setPlans(plans)),
          catchError((error) => {
            console.error(error);
            return of(this.setPlans([]));
          })
        )
      )
    );
  });

  readonly fetchGroups = this.effect(() => {
    return this.plan$.pipe(
      filter((plan) => !!plan),
      switchMap(({ _id }) =>
        this.service.getGroups(_id).pipe(
          tap((groups) => this.setGroups(groups)),
          catchError((error) => {
            console.error(error);
            return of(this.setGroups([]));
          })
        )
      )
    );
  });

  // UPDATERS

  public readonly setSchool = this.updater(
    (state, school: School): FormState => ({
      ...state,
      selectedSchool: school,
    })
  );
  public readonly setSchools = this.updater(
    (state, schools: School[]): FormState => ({
      ...state,
      schools,
    })
  );

  public readonly setDegree = this.updater(
    (state, degree: Degree): FormState => ({ ...state, selectedDegree: degree })
  );

  private readonly setDegrees = this.updater(
    (state, degrees: Degree[]): FormState => ({ ...state, degrees })
  );

  public readonly setPlan = this.updater(
    (state, plan: StudyPlan): FormState => ({ ...state, selectedPlan: plan })
  );

  private readonly setPlans = this.updater(
    (state, plans: StudyPlan[]): FormState => ({ ...state, plans })
  );

  public readonly setGroup = this.updater(
    (state, group: ClassGroup): FormState => ({
      ...state,
      selectedGroup: group,
    })
  );
  private readonly setGroups = this.updater(
    (state, groups: ClassGroup[]): FormState => ({ ...state, groups })
  );

  ngrxOnStoreInit = () => {
    this.setState({ groups: [], plans: [], degrees: [], schools: [] });
  };
}

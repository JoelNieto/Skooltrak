import { inject, Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { Degree, School } from '@skooltrak-app/models';
import { map } from 'rxjs';
import { StudyPlanFormService } from './study-plan-form.service';

interface FormState {
  schools: School[];
  degrees: Degree[];
}

@Injectable()
export class StudyPlanFormStore
  extends ComponentStore<FormState>
  implements OnStoreInit
{
  private readonly service = inject(StudyPlanFormService);
  // SELECTORS

  public readonly schools$ = this.select((state) => state.schools);

  public readonly degrees$ = this.select((state) => state.degrees);

  // UPDATERS
  private readonly setSchools = this.updater(
    (state, schools: School[]): FormState => ({ ...state, schools })
  );

  private readonly setDegrees = this.updater(
    (state, degrees: Degree[]): FormState => ({ ...state, degrees })
  );

  // EFFECTS
  private readonly fetchSchools = this.effect(() => {
    return this.service
      .getSchools()
      .pipe(map((plans) => this.setSchools(plans)));
  });

  private readonly fetchDegrees = this.effect(() => {
    return this.service
      .getDegrees()
      .pipe(map((degrees) => this.setDegrees(degrees)));
  });

  ngrxOnStoreInit() {
    this.setState({ schools: [], degrees: [] });
  }
}

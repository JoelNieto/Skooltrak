import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { School } from '@skooltrak-app/models';
import { map } from 'rxjs';
import { PeriodsFormService } from './periods-form.service';

interface State {
  schools: School[];
}

@Injectable()
export class PeriodsFormStore extends ComponentStore<State> {
  constructor(private readonly service: PeriodsFormService) {
    super({ schools: [] });
  }

  // SELECTORS
  public readonly schools$ = this.select((state) => state.schools);

  // UPDATERS
  private readonly setSchools = this.updater(
    (state, schools: School[]): State => ({ ...state, schools })
  );

  // EFFECTS
  readonly fetchSchools = this.effect(() => {
    return this.service
      .getSchools()
      .pipe(map((schools) => this.setSchools(schools)));
  });
}

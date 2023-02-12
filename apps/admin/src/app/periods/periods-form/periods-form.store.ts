import { inject, Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { School } from '@skooltrak-app/models';
import { map } from 'rxjs';
import { PeriodsFormService } from './periods-form.service';

interface State {
  schools: School[];
}

@Injectable()
export class PeriodsFormStore
  extends ComponentStore<State>
  implements OnStoreInit
{
  private service = inject(PeriodsFormService);

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

  ngrxOnStoreInit = () => this.setState({ schools: [] });
}

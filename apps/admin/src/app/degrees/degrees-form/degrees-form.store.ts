import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { School } from '@skooltrak-app/models';
import { map } from 'rxjs';
import { DegreesFormService } from './degrees-form.service';

interface FormState {
  schools: School[];
}

@Injectable()
export class DegreesFormStore
  extends ComponentStore<FormState>
  implements OnStoreInit
{
  constructor(private service: DegreesFormService) {
    super({ schools: [] });
  }

  // SELECTORS
  public readonly schools$ = this.select((state) => state.schools);

  // UPDATERS
  private readonly setSchools = this.updater(
    (state, schools: School[]): FormState => ({ ...state, schools })
  );

  // EFFECTS
  private readonly fetchSchools = this.effect(() => {
    return this.service
      .getSchools()
      .pipe(map((plans) => this.setSchools(plans)));
  });

  ngrxOnStoreInit() {
    this.fetchSchools();
  }
}
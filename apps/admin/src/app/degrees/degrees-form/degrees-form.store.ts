import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { School } from '@skooltrak-app/models';
import { map } from 'rxjs';
import { DegreesFormService } from './degrees-form.service';

interface FormState {
  schools: School[];
}

@Injectable()
export class DegreesFormStore extends ComponentStore<FormState> {
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
  readonly fetchSchools = this.effect(() => {
    return this.service
      .getSchools()
      .pipe(map((schools) => this.setSchools(schools)));
  });
}

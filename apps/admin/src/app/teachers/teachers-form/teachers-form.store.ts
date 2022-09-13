import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { Subject } from '@skooltrak-app/models';
import { map } from 'rxjs';
import { TeachersFormService } from './teachers-form.service';

interface FormState {
  subjects: Subject[];
}

@Injectable()
export class TeachersFormStore
  extends ComponentStore<FormState>
  implements OnStoreInit
{
  constructor(private service: TeachersFormService) {
    super({ subjects: [] });
  }

  // SELECTORS
  public readonly subjects$ = this.select((state) => state.subjects);

  // UPDATERS
  private readonly setSubjects = this.updater(
    (state, subjects: Subject[]): FormState => ({ ...state, subjects })
  );

  // EFFECTS
  private readonly fetchSubjects = this.effect(() => {
    return this.service
      .getSubjects()
      .pipe(map((subjects) => this.setSubjects(subjects)));
  });

  ngrxOnStoreInit() {
    this.fetchSubjects();
  }
}

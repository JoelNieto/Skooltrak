import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { ClassGroup, Course } from '@skooltrak-app/models';

export interface FormState {
  courses: Course[];
  currentCourse?: Course;
  groups: ClassGroup[];
  currentGroup?: ClassGroup;
}

@Injectable()
export class AssignmentFormStore
  extends ComponentStore<FormState>
  implements OnStoreInit
{
  constructor() {
    super({ courses: [], groups: [] });
  }
  ngrxOnStoreInit() {
    console.info('Started');
  }

  // SELECTORS
}

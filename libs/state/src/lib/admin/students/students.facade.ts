import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { StudentsActions } from './students.actions';
import { selectAllStudents } from './students.selectors';

@Injectable({ providedIn: 'root' })
export class StudentsFacade {
  allStudents$ = this.store.select(selectAllStudents);

  constructor(private store: Store) {}

  init() {
    this.store.dispatch(StudentsActions.loadStudents());
  }
}

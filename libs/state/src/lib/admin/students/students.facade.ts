import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Student } from '@skooltrak-app/models';

import { selectAllClassGroups } from '../class-groups/class-groups.selectors';
import { selectAllDegrees } from '../degrees/degrees.selectors';
import { selectAllSchools } from '../schools';
import { selectAllPlans } from '../study-plans/study-plans.selectors';
import { StudentsActions } from './students.actions';
import { selectAllStudents, selectSelected } from './students.selectors';
import { StudentsService } from './students.service';

@Injectable({ providedIn: 'root' })
export class StudentsFacade {
  allStudents$ = this.store$.select(selectAllStudents);
  selectedStudent$ = this.store$.select(selectSelected);
  allGroups$ = this.store$.select(selectAllClassGroups);
  allSchools$ = this.store$.select(selectAllSchools);
  allDegrees$ = this.store$.select(selectAllDegrees);
  allPlans$ = this.store$.select(selectAllPlans);
  constructor(private store$: Store, private service: StudentsService) {}

  init() {
    this.store$.dispatch(StudentsActions.loadStudents());
  }

  create(request: Partial<Student>) {
    this.store$.dispatch(StudentsActions.createStudent({ request }));
  }

  setStudent(id: string | undefined) {
    this.store$.dispatch(StudentsActions.setStudent({ id }));
  }

  changePicture(file: File) {
    return this.service.changePicture(file);
  }

  setChangedPicture(changed: boolean) {
    this.store$.dispatch(StudentsActions.pictureChanged({ changed }));
  }
}

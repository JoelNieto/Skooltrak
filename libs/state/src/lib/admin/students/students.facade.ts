import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Student } from '@skooltrak-app/models';

import { StudentsActions } from './students.actions';
import {
  selectAllStudents,
  selectSelected,
  selectSelectedId,
  selectStudentsSaving,
} from './students.selectors';
import { StudentsService } from './students.service';

@Injectable({ providedIn: 'root' })
export class StudentsFacade {
  allStudents$ = this.store$.select(selectAllStudents);
  selectedStudent$ = this.store$.select(selectSelected);
  selectedStudentId$ = this.store$.select(selectSelectedId);
  saving$ = this.store$.select(selectStudentsSaving);
  constructor(private store$: Store, private service: StudentsService) {}

  init() {
    this.store$.dispatch(StudentsActions.loadStudents());
  }

  create(request: Partial<Student>) {
    this.store$.dispatch(StudentsActions.createStudent({ request }));
  }

  update(id: string, request: Partial<Student>) {
    this.store$.dispatch(StudentsActions.updateStudent({ id, request }));
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

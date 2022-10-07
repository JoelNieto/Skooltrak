/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { Student } from '@skooltrak-app/models';
import { teacher_groups } from '@skooltrak-app/state';
import { filter, map, switchMap } from 'rxjs';
import { GroupsStudentsService } from './groups-students.service';

interface State {
  students: Student[];
}

@Injectable()
export class GroupsStudentsStore
  extends ComponentStore<State>
  implements OnStoreInit
{
  constructor(
    private store: teacher_groups.GroupsFacade,
    private service: GroupsStudentsService
  ) {
    super({ students: [] });
  }

  // SELECTORS
  readonly students$ = this.select((state) => state.students);

  // EFFECTS
  readonly fetchStudents = this.effect(() => {
    return this.store.selectedGroupId$.pipe(
      filter((id) => !!id),
      switchMap((id) =>
        this.service
          .getStudents(id!)
          .pipe(map((students) => this.setStudents(students)))
      )
    );
  });

  // UPDATERS
  private readonly setStudents = this.updater(
    (state, students: Student[]): State => ({ ...state, students })
  );

  ngrxOnStoreInit = () => {
    this.fetchStudents();
  };
}

import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Student } from '@skooltrak-app/models';
import { filter, map, switchMap, tap } from 'rxjs';
import { StudentsDetailsService } from './students-details.service';

interface State {
  id?: string;
  student?: Student;
  loading: boolean;
}

@Injectable()
export class StudentsDetailsStore extends ComponentStore<State> {
  constructor(private readonly service: StudentsDetailsService) {
    super({ loading: true });
  }

  // SELECTORS
  readonly student$ = this.select((state) => state.student);
  readonly id$ = this.select((state) => state.id);
  readonly loading$ = this.select((state) => state.loading);

  // EFFECTS
  readonly fetchStudent = this.effect(() => {
    return this.id$.pipe(
      filter((id) => !!id),
      switchMap((id) =>
        this.service.getStudent(id).pipe(
          map((student) => this.setStudent(student)),
          tap(() => this.setLoading(false))
        )
      )
    );
  });

  // UPDATERS
  readonly setId = this.updater(
    (state, id: string): State => ({ ...state, id })
  );

  private readonly setStudent = this.updater(
    (state, student: Student): State => ({ ...state, student })
  );
  private readonly setLoading = this.updater(
    (state, loading: boolean): State => ({ ...state, loading })
  );
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { School } from '@skooltrak-app/models';
import { catchError, map, of, tap } from 'rxjs';

interface State {
  schools: School[];
  loading: boolean;
}

@Injectable()
export class SignInStore extends ComponentStore<State> implements OnStoreInit {
  private http = inject(HttpClient);

  readonly schools$ = this.select((state) => state.schools);
  readonly loading$ = this.select((state) => state.loading);

  // UPDATERS

  private readonly setSchools = this.updater(
    (state, schools: School[]): State => ({ ...state, schools })
  );

  private readonly setLoading = this.updater(
    (state, loading: boolean): State => ({
      ...state,
      loading,
    })
  );

  readonly fetchSchools = this.effect(() => {
    return this.http.get<School[]>('/api/schools').pipe(
      catchError((error) => {
        console.error(error);
        this.setLoading(false);
        return of([]);
      }),
      map((schools) => this.setSchools(schools)),
      tap(() => this.setLoading(false))
    );
  });

  ngrxOnStoreInit = () => {
    this.setState({ schools: [], loading: true });
  };
}

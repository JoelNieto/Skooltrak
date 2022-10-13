import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { Period } from '@skooltrak-app/models';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { PeriodsService } from './periods.service';

interface State {
  periods: Period[];
  loading: boolean;
}

@Injectable()
export class PeriodsStore extends ComponentStore<State> {
  constructor(
    private service: PeriodsService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    super({ periods: [], loading: true });
  }

  // SELECTORS

  readonly periods$ = this.select((state) => state.periods);

  // UPDATERS

  private readonly setPeriods = this.updater(
    (state, periods: Period[]): State => ({ ...state, periods })
  );

  private readonly addPeriod = this.updater(
    (state, type: Period): State => ({
      ...state,
      ...{ periods: [...state.periods, type] },
    })
  );

  private readonly updatePeriod = this.updater(
    (state, updatedPeriod: Period): State => ({
      ...state,
      ...{
        periods: state.periods.map((type) =>
          type._id === updatedPeriod._id ? updatedPeriod : type
        ),
      },
    })
  );

  private readonly removePeriod = this.updater(
    (state, id: string): State => ({
      ...state,
      ...{ periods: state.periods.filter((x) => x._id !== id) },
    })
  );

  private readonly setLoading = this.updater(
    (state, loading: boolean): State => ({
      ...state,
      loading,
    })
  );

  // EFFECTS

  readonly fetchPeriods = this.effect(() => {
    return this.service.getAll().pipe(
      catchError((error) => {
        console.error(error);
        this.setLoading(false);
        this.snackBar.open(
          this.translate.instant('Something went wrong'),
          undefined,
          { panelClass: ['alert', 'failure'] }
        );
        return of([]);
      }),
      map((periods) => this.setPeriods(periods)),
      tap(() => this.setLoading(false))
    );
  });

  readonly createPeriod = this.effect((request$: Observable<Period>) => {
    return request$.pipe(
      switchMap((request) =>
        this.service.post(request).pipe(
          map((type) => this.addPeriod(type)),
          tap(() =>
            this.snackBar.open(
              this.translate.instant('Item created successfully'),
              undefined,
              { panelClass: ['alert', 'success'] }
            )
          ),
          catchError((error) => {
            console.error(error);
            return of(
              this.snackBar.open(
                this.translate.instant('Something went wrong'),
                undefined,
                { panelClass: ['alert', 'failure'] }
              )
            );
          })
        )
      )
    );
  });

  readonly patchPeriod = this.effect(
    (request$: Observable<{ id: string; request: Period }>) => {
      return request$.pipe(
        switchMap(({ id, request }) =>
          this.service.patch(id, request).pipe(
            map((payload) => this.updatePeriod(payload)),
            tap(() =>
              this.snackBar.open(
                this.translate.instant('Item updated successfully'),
                undefined,
                { panelClass: ['alert', 'success'] }
              )
            ),
            catchError((error) => {
              console.error(error);
              return of(
                this.snackBar.open(
                  this.translate.instant('Something went wrong'),
                  undefined,
                  { panelClass: ['alert', 'failure'] }
                )
              );
            })
          )
        )
      );
    }
  );

  readonly deletePeriod = this.effect((request$: Observable<string>) => {
    return request$.pipe(
      switchMap((id) =>
        this.service.delete(id).pipe(
          map(() => this.removePeriod(id)),
          tap(() =>
            this.snackBar.open(
              this.translate.instant('Item deleted successfully'),
              undefined,
              { panelClass: ['alert', 'success'] }
            )
          ),
          catchError((error) => {
            console.error(error);
            return of(
              this.snackBar.open(
                this.translate.instant('Something went wrong'),
                undefined,
                { panelClass: ['alert', 'failure'] }
              )
            );
          })
        )
      )
    );
  });
}

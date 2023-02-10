import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { Degree } from '@skooltrak-app/models';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { DegreesService } from './degrees.service';

interface State {
  degrees: Degree[];
  loading: boolean;
}

@Injectable()
export class DegreesStore extends ComponentStore<State> implements OnStoreInit {
  private service = inject(DegreesService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  // SELECTORS

  readonly degrees$ = this.select((state) => state.degrees);

  // UPDATERS

  private readonly setDegrees = this.updater(
    (state, degrees: Degree[]): State => ({ ...state, degrees })
  );

  private readonly addDegree = this.updater(
    (state, type: Degree): State => ({
      ...state,
      ...{ degrees: [...state.degrees, type] },
    })
  );

  private readonly updateDegree = this.updater(
    (state, updatedDegree: Degree): State => ({
      ...state,
      ...{
        degrees: state.degrees.map((type) =>
          type._id === updatedDegree._id ? updatedDegree : type
        ),
      },
    })
  );

  private readonly removeDegree = this.updater(
    (state, id: string): State => ({
      ...state,
      ...{ degrees: state.degrees.filter((x) => x._id !== id) },
    })
  );

  private readonly setLoading = this.updater(
    (state, loading: boolean): State => ({
      ...state,
      loading,
    })
  );

  // EFFECTS

  readonly fetchDegrees = this.effect(() => {
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
      map((degrees) => this.setDegrees(degrees)),
      tap(() => this.setLoading(false))
    );
  });

  readonly createDegree = this.effect((request$: Observable<Degree>) => {
    return request$.pipe(
      switchMap((request) =>
        this.service.post(request).pipe(
          map((type) => this.addDegree(type)),
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

  readonly patchDegree = this.effect(
    (request$: Observable<{ id: string; request: Degree }>) => {
      return request$.pipe(
        switchMap(({ id, request }) =>
          this.service.patch(id, request).pipe(
            map((payload) => this.updateDegree(payload)),
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

  readonly deleteDegree = this.effect((request$: Observable<string>) => {
    return request$.pipe(
      switchMap((id) =>
        this.service.delete(id).pipe(
          map(() => this.removeDegree(id)),
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

  ngrxOnStoreInit = () => {
    this.setState({ degrees: [], loading: true });
  };
}

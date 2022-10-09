import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { AssignmentType } from '@skooltrak-app/models';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AssignmentTypesService } from './assignment-types.service';

interface State {
  types: AssignmentType[];
  loading: boolean;
}

@Injectable()
export class AssignmentTypesStore extends ComponentStore<State> {
  constructor(
    private service: AssignmentTypesService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    super({ types: [], loading: true });
  }

  // SELECTORS

  readonly types$ = this.select((state) => state.types);

  // UPDATERS

  private readonly setTypes = this.updater(
    (state, types: AssignmentType[]): State => ({ ...state, types })
  );

  private readonly addType = this.updater(
    (state, type: AssignmentType): State => ({
      ...state,
      ...{ types: [...state.types, type] },
    })
  );

  private readonly updateType = this.updater(
    (state, updatedType: AssignmentType): State => ({
      ...state,
      ...{
        types: state.types.map((type) =>
          type._id === updatedType._id ? updatedType : type
        ),
      },
    })
  );

  private readonly removeType = this.updater(
    (state, id: string): State => ({
      ...state,
      ...{ types: state.types.filter((x) => x._id !== id) },
    })
  );

  private readonly setLoading = this.updater(
    (state, loading: boolean): State => ({
      ...state,
      loading,
    })
  );

  // EFFECTS

  readonly fetchTypes = this.effect(() => {
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
      map((types) => this.setTypes(types)),
      tap(() => this.setLoading(false))
    );
  });

  readonly createType = this.effect((request$: Observable<AssignmentType>) => {
    return request$.pipe(
      switchMap((request) =>
        this.service.post(request).pipe(
          map((type) => this.addType(type)),
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

  readonly patchType = this.effect(
    (request$: Observable<{ id: string; request: AssignmentType }>) => {
      return request$.pipe(
        switchMap(({ id, request }) =>
          this.service.patch(id, request).pipe(
            map((payload) => this.updateType(payload)),
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

  readonly deleteType = this.effect((request$: Observable<string>) => {
    return request$.pipe(
      switchMap((id) =>
        this.service.delete(id).pipe(
          map(() => this.removeType(id)),
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

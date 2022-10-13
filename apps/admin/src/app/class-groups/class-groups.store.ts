import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { ClassGroup } from '@skooltrak-app/models';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { ClassGroupsService } from './class-groups.service';

interface State {
  groups: ClassGroup[];
  selectedId?: string | undefined;
  loading: boolean;
}

@Injectable()
export class ClassGroupsStore extends ComponentStore<State> {
  constructor(
    private service: ClassGroupsService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    super({ groups: [], loading: true });
  }

  // SELECTORS

  readonly groups$ = this.select((state) => state.groups);
  readonly selectedGroup$ = this.select((state) =>
    state.selectedId
      ? state.groups.find((x) => x._id === state.selectedId)
      : null
  );

  // UPDATERS

  private readonly setClassGroups = this.updater(
    (state, groups: ClassGroup[]): State => ({ ...state, groups })
  );

  private readonly addClassGroup = this.updater(
    (state, type: ClassGroup): State => ({
      ...state,
      ...{ groups: [...state.groups, type] },
    })
  );

  private readonly updateClassGroup = this.updater(
    (state, updatedClassGroup: ClassGroup): State => ({
      ...state,
      ...{
        groups: state.groups.map((type) =>
          type._id === updatedClassGroup._id ? updatedClassGroup : type
        ),
      },
    })
  );

  private readonly removeClassGroup = this.updater(
    (state, id: string): State => ({
      ...state,
      ...{ groups: state.groups.filter((x) => x._id !== id) },
    })
  );

  private readonly setLoading = this.updater(
    (state, loading: boolean): State => ({
      ...state,
      loading,
    })
  );

  public readonly setClassGroup = this.updater(
    (state, id: string | undefined): State => ({ ...state, selectedId: id })
  );

  // EFFECTS

  readonly fetchClassGroups = this.effect(() => {
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
      map((groups) => this.setClassGroups(groups)),
      tap(() => this.setLoading(false))
    );
  });

  readonly createClassGroup = this.effect(
    (request$: Observable<ClassGroup>) => {
      return request$.pipe(
        switchMap((request) =>
          this.service.post(request).pipe(
            map((type) => this.addClassGroup(type)),
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
    }
  );

  readonly patchClassGroup = this.effect(
    (request$: Observable<{ id: string; request: ClassGroup }>) => {
      return request$.pipe(
        switchMap(({ id, request }) =>
          this.service.patch(id, request).pipe(
            map((payload) => this.updateClassGroup(payload)),
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

  readonly deleteClassGroup = this.effect((request$: Observable<string>) => {
    return request$.pipe(
      switchMap((id) =>
        this.service.delete(id).pipe(
          map(() => this.removeClassGroup(id)),
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

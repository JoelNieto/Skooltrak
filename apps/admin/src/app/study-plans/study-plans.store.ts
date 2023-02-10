import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { StudyPlan } from '@skooltrak-app/models';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { StudyPlansService } from './study-plans.service';

interface State {
  plans: StudyPlan[];
  loading: boolean;
}

@Injectable()
export class StudyPlansStore
  extends ComponentStore<State>
  implements OnStoreInit
{
  private service = inject(StudyPlansService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  // SELECTORS

  readonly plans$ = this.select((state) => state.plans);

  // UPDATERS

  private readonly setStudyPlans = this.updater(
    (state, plans: StudyPlan[]): State => ({ ...state, plans })
  );

  private readonly addStudyPlan = this.updater(
    (state, type: StudyPlan): State => ({
      ...state,
      ...{ plans: [...state.plans, type] },
    })
  );

  private readonly updateStudyPlan = this.updater(
    (state, updatedStudyPlan: StudyPlan): State => ({
      ...state,
      ...{
        plans: state.plans.map((type) =>
          type._id === updatedStudyPlan._id ? updatedStudyPlan : type
        ),
      },
    })
  );

  private readonly removeStudyPlan = this.updater(
    (state, id: string): State => ({
      ...state,
      ...{ plans: state.plans.filter((x) => x._id !== id) },
    })
  );

  private readonly setLoading = this.updater(
    (state, loading: boolean): State => ({
      ...state,
      loading,
    })
  );

  // EFFECTS

  readonly fetchStudyPlans = this.effect(() => {
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
      map((plans) => this.setStudyPlans(plans)),
      tap(() => this.setLoading(false))
    );
  });

  readonly createStudyPlan = this.effect((request$: Observable<StudyPlan>) => {
    return request$.pipe(
      switchMap((request) =>
        this.service.post(request).pipe(
          map((type) => this.addStudyPlan(type)),
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

  readonly patchStudyPlan = this.effect(
    (request$: Observable<{ id: string; request: StudyPlan }>) => {
      return request$.pipe(
        switchMap(({ id, request }) =>
          this.service.patch(id, request).pipe(
            map((payload) => this.updateStudyPlan(payload)),
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

  readonly deleteStudyPlan = this.effect((request$: Observable<string>) => {
    return request$.pipe(
      switchMap((id) =>
        this.service.delete(id).pipe(
          map(() => this.removeStudyPlan(id)),
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

  ngrxOnStoreInit = () => this.setState({ plans: [], loading: true });
}

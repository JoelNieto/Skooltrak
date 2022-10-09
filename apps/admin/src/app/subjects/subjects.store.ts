import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from '@skooltrak-app/models';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { SubjectsService } from './subjects.service';

interface State {
  subjects: Subject[];
  loading: boolean;
}

@Injectable()
export class SubjectsStore extends ComponentStore<State> {
  constructor(
    private service: SubjectsService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    super({ subjects: [], loading: true });
  }

  // SELECTORS

  readonly subjects$ = this.select((state) => state.subjects);

  // UPDATERS

  private readonly setSubjects = this.updater(
    (state, subjects: Subject[]): State => ({ ...state, subjects })
  );

  private readonly addSubject = this.updater(
    (state, type: Subject): State => ({
      ...state,
      ...{ subjects: [...state.subjects, type] },
    })
  );

  private readonly updateSubject = this.updater(
    (state, updatedSubject: Subject): State => ({
      ...state,
      ...{
        subjects: state.subjects.map((type) =>
          type._id === updatedSubject._id ? updatedSubject : type
        ),
      },
    })
  );

  private readonly removeSubject = this.updater(
    (state, id: string): State => ({
      ...state,
      ...{ subjects: state.subjects.filter((x) => x._id !== id) },
    })
  );

  private readonly setLoading = this.updater(
    (state, loading: boolean): State => ({
      ...state,
      loading,
    })
  );

  // EFFECTS

  readonly fetchSubjects = this.effect(() => {
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
      map((subjects) => this.setSubjects(subjects)),
      tap(() => this.setLoading(false))
    );
  });

  readonly createSubject = this.effect((request$: Observable<Subject>) => {
    return request$.pipe(
      switchMap((request) =>
        this.service.post(request).pipe(
          map((type) => this.addSubject(type)),
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

  readonly patchSubject = this.effect(
    (request$: Observable<{ id: string; request: Subject }>) => {
      return request$.pipe(
        switchMap(({ id, request }) =>
          this.service.patch(id, request).pipe(
            map((payload) => this.updateSubject(payload)),
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

  readonly deleteSubject = this.effect((request$: Observable<string>) => {
    return request$.pipe(
      switchMap((id) =>
        this.service.delete(id).pipe(
          map(() => this.removeSubject(id)),
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

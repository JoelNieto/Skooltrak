/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Observable, of, Subject } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

export class AsyncWrapper<T> {
  private readonly _errorLoading$ = new Subject<boolean>();
  readonly errorLoading$: Observable<boolean> = this._errorLoading$.pipe(
    shareReplay(1)
  );
  readonly data$: Observable<T>;

  constructor(data$: Observable<T>) {
    this.data$ = data$.pipe(
      shareReplay(1),
      catchError((error) => {
        console.log(error);
        // eslint-disable-next-line no-underscore-dangle
        this._errorLoading$.next(true);
        return of<T>();
      })
    );
  }
}
